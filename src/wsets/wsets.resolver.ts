import { PrismaService } from 'nestjs-prisma';
import {
  Resolver,
  Query,
  Parent,
  Args,
  ResolveField,
  Subscription,
  Mutation,
} from '@nestjs/graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards } from '@nestjs/common';
import { PaginationArgs } from '../common/pagination/pagination.args';
import { UserEntity } from '../common/decorators/user.decorator';
import { User } from '../users/models/user.model';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { WSetIdArgs } from './args/wset-id.args';
import { UserIdArgs } from './args/user-id.args';
import { WSet } from './models/wset.model';
import { WSetConnection } from './models/wset-connection.model';
import { WSetOrder } from './dto/wset-order.input';
import { CreateWSetInput } from './dto/createWSet.input';

const pubSub = new PubSub();

@Resolver(() => WSet)
export class WSetsResolver {
  constructor(private prisma: PrismaService) {}

  @Subscription(() => WSet)
  wsetCreated() {
    return pubSub.asyncIterator('wsetCreated');
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => WSet)
  async createWSet(
    @UserEntity() user: User,
    @Args('data') data: CreateWSetInput,
  ) {
    const newWSet = this.prisma.wSet.create({
      data: {
        title: data.title,
        description: data.description,
        folderId: data.folderId,
        authorId: user.id,
      },
    });
    pubSub.publish('wsetCreated', { wsetCreated: newWSet });
    return newWSet;
  }

  @Query(() => WSetConnection)
  async publishedWSets(
    @Args() { after, before, first, last }: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true })
    query: string,
    @Args({
      name: 'orderBy',
      type: () => WSetOrder,
      nullable: true,
    })
    orderBy: WSetOrder,
  ) {
    const a = await findManyCursorConnection(
      (args) =>
        this.prisma.wSet.findMany({
          include: { author: true },
          where: {
            title: { contains: query || '' },
          },
          orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : undefined,
          ...args,
        }),
      () =>
        this.prisma.wSet.count({
          where: {
            title: { contains: query || '' },
          },
        }),
      { first, last, before, after },
    );
    return a;
  }

  @Query(() => [WSet])
  userWSets(@Args('id') id: string) {
    return this.prisma.user.findUnique({ where: { id: id } }).wsets();

    // or
    // return this.prisma.wsets.findMany({
    //   where: {
    //     author: { id: id.userId }
    //   }
    // });
  }

  @Query(() => [WSet])
  folderWSets(@Args('id') id: string) {
    return this.prisma.folder.findUnique({ where: { id: id } }).wsets();

    // or
    // return this.prisma.wsets.findMany({
    //   where: {
    //     author: { id: id.userId }
    //   }
    // });
  }

  @Query(() => WSet)
  async wset(@Args('id') id: string) {
    return this.prisma.wSet.findUnique({ where: { id } });
  }

  @ResolveField('author', () => User)
  async author(@Parent() wset: WSet) {
    return this.prisma.wSet.findUnique({ where: { id: wset.id } }).author();
  }
}
