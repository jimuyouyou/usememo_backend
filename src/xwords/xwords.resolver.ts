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
import { XwordIdArgs } from './args/xword-id.args';
import { UserIdArgs } from './args/user-id.args';
import { Xword } from './models/xword.model';
import { XwordConnection } from './models/xword-connection.model';
import { XwordOrder } from './dto/xword-order.input';
import { CreateXwordInput } from './dto/createXword.input';

const pubSub = new PubSub();

@Resolver(() => Xword)
export class XwordsResolver {
  constructor(private prisma: PrismaService) {}

  @Subscription(() => Xword)
  xwordCreated() {
    return pubSub.asyncIterator('xwordCreated');
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Xword)
  async createXword(
    @UserEntity() user: User,
    @Args('data') data: CreateXwordInput,
  ) {
    const newXword = this.prisma.xword.create({
      data,
    });
    pubSub.publish('xwordCreated', { wordCreated: newXword });
    return newXword;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Xword)
  async updateXword(
    @UserEntity() user: User,
    @Args('id') id: string,
    @Args('data') data: CreateXwordInput,
  ) {
    const newXword = this.prisma.xword.update({
      where: { id },
      data,
    });
    pubSub.publish('xwordUpdated', { wordUpdated: newXword });
    return newXword;
  }

  @Query(() => XwordConnection)
  async publishedXwords(
    @Args() { after, before, first, last }: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true })
    query: string,
    @Args({
      name: 'orderBy',
      type: () => XwordOrder,
      nullable: true,
    })
    orderBy: XwordOrder,
  ) {
    const a = await findManyCursorConnection(
      (args) =>
        this.prisma.xword.findMany({
          // include: { author: true },
          where: {
            title: { contains: query || '' },
          },
          orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : undefined,
          ...args,
        }),
      () =>
        this.prisma.xword.count({
          where: {
            title: { contains: query || '' },
          },
        }),
      { first, last, before, after },
    );
    return a;
  }

  @Query(() => [Xword])
  titleXwords(
    @Args('title') title: string,
    @Args('titleLang') titleLang: string,
  ) {
    const res = this.prisma.xword.findMany({ where: { title, titleLang } });
    return res && res[0];
  }

  @Query(() => Xword)
  async xword(@Args('id') id: string) {
    return this.prisma.xword.findUnique({ where: { id } });
  }
}
