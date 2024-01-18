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
import { WsetIdArgs } from './args/wset-id.args';
import { UserIdArgs } from './args/user-id.args';
import { Wset } from './models/wset.model';
import { WsetConnection } from './models/wset-connection.model';
import { WsetOrder } from './dto/wset-order.input';
import { CreateWsetInput } from './dto/createWset.input';

const pubSub = new PubSub();

@Resolver(() => Wset)
export class WsetsResolver {
  constructor(private prisma: PrismaService) {}

  @Subscription(() => Wset)
  wsetCreated() {
    return pubSub.asyncIterator('wsetCreated');
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Wset)
  async createWset(
    @UserEntity() user: User,
    @Args('data') data: CreateWsetInput,
  ) {
    const newWset = await this.prisma.wset.create({
      data: {
        title: data.title,
        description: data.description,
        folderId: data.folderId,
        authorId: user.id,
      },
    });
    pubSub.publish('wsetCreated', { wsetCreated: newWset });
    return newWset;
  }

  @Query(() => WsetConnection)
  async publishedWsets(
    @Args() { after, before, first, last }: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true })
    query: string,
    @Args({
      name: 'orderBy',
      type: () => WsetOrder,
      nullable: true,
    })
    orderBy: WsetOrder,
  ) {
    const a = await findManyCursorConnection(
      (args) =>
        this.prisma.wset.findMany({
          include: { author: true },
          where: {
            title: { contains: query || '' },
          },
          orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : undefined,
          ...args,
        }),
      () =>
        this.prisma.wset.count({
          where: {
            title: { contains: query || '' },
          },
        }),
      { first, last, before, after },
    );
    return a;
  }

  @Query(() => [Wset])
  async userWsets(@Args('id') id: string) {
    return await this.prisma.user.findUnique({ where: { id: id } }).wsets();

    // or
    // return this.prisma.wsets.findMany({
    //   where: {
    //     author: { id: id.userId }
    //   }
    // });
  }

  @Query(() => [Wset])
  async folderWsets(@Args('id') id: string) {
    return await this.prisma.folder.findUnique({ where: { id: id } }).wsets();

    // or
    // return this.prisma.wsets.findMany({
    //   where: {
    //     author: { id: id.userId }
    //   }
    // });
  }

  @Query(() => Wset)
  async wset(@Args('id') id: string) {
    return await this.prisma.wset.findUnique({ where: { id } });
  }

  @ResolveField('author', () => User)
  async author(@Parent() wset: Wset) {
    return await this.prisma.wset.findUnique({ where: { id: wset.id } }).author();
  }
}
