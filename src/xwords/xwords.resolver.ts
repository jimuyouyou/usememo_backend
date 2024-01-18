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
import { WSet } from '../wsets/models/WSet.model';
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
    const newXword = this.prisma.word.create({
      data,
    });
    pubSub.publish('wordCreated', { wordCreated: newXword });
    return newXword;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Xword)
  async updateXword(
    @UserEntity() user: User,
    @Args('data') data: CreateXwordInput,
    @Args('id') id: string,
  ) {
    const newXword = this.prisma.word.update({
      where: { id },
      data,
    });
    pubSub.publish('wordUpdated', { wordUpdated: newXword });
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
        this.prisma.word.findMany({
          // include: { author: true },
          where: {
            title: { contains: query || '' },
          },
          orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : undefined,
          ...args,
        }),
      () =>
        this.prisma.word.count({
          where: {
            title: { contains: query || '' },
          },
        }),
      { first, last, before, after },
    );
    return a;
  }

  @Query(() => [Xword])
  setXwords(@Args('id') id: string) {
    return this.prisma.wSet.findUnique({ where: { id: id } }).words();
  }

  @Query(() => Xword)
  async word(@Args('id') id: string) {
    return this.prisma.word.findUnique({ where: { id } });
  }

  @ResolveField('wset', () => WSet)
  async wset(@Parent() word: Xword) {
    return this.prisma.word.findUnique({ where: { id: word.id } }).wset();
  }
}
