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
import { WordIdArgs } from './args/word-id.args';
import { UserIdArgs } from './args/user-id.args';
import { Word } from './models/word.model';
import { WordConnection } from './models/word-connection.model';
import { WordOrder } from './dto/word-order.input';
import { CreateWordInput } from './dto/createWord.input';

const pubSub = new PubSub();

@Resolver(() => Word)
export class WordsResolver {
  constructor(private prisma: PrismaService) {}

  @Subscription(() => Word)
  wordCreated() {
    return pubSub.asyncIterator('wordCreated');
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Word)
  async createWord(
    @UserEntity() user: User,
    @Args('data') data: CreateWordInput,
  ) {
    const newWord = this.prisma.word.create({
      data,
    });
    pubSub.publish('wordCreated', { wordCreated: newWord });
    return newWord;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Word)
  async updateWord(
    @UserEntity() user: User,
    @Args('id') id: string,
    @Args('data') data: CreateWordInput,
  ) {
    const newWord = await this.prisma.word.update({
      where: { id },
      data,
    });
    pubSub.publish('wordUpdated', { wordUpdated: newWord });
    return newWord;
  }

  @Query(() => WordConnection)
  async publishedWords(
    @Args() { after, before, first, last }: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true })
    query: string,
    @Args({
      name: 'orderBy',
      type: () => WordOrder,
      nullable: true,
    })
    orderBy: WordOrder,
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

  @Query(() => [Word])
  async setWords(@Args('id') id: string) {
    return await this.prisma.wSet.findUnique({ where: { id: id } }).words();
  }

  @Query(() => Word)
  async word(@Args('id') id: string) {
    return this.prisma.word.findUnique({ where: { id } });
  }

  @ResolveField('wset', () => WSet)
  async wset(@Parent() word: Word) {
    return this.prisma.word.findUnique({ where: { id: word.id } }).wset();
  }
}
