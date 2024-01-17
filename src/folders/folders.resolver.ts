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
import { FolderIdArgs } from './args/folder-id.args';
import { UserIdArgs } from './args/user-id.args';
import { Folder } from './models/folder.model';
import { FolderConnection } from './models/folder-connection.model';
import { FolderOrder } from './dto/folder-order.input';
import { CreateFolderInput } from './dto/createFolder.input';

const pubSub = new PubSub();

@Resolver(() => Folder)
export class FoldersResolver {
  constructor(private prisma: PrismaService) {}

  @Subscription(() => Folder)
  folderCreated() {
    return pubSub.asyncIterator('folderCreated');
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Folder)
  async createFolder(
    @UserEntity() user: User,
    @Args('data') data: CreateFolderInput,
  ) {
    const newFolder = this.prisma.folder.create({
      data: {
        title: data.title,
        description: data.description,
        authorId: user.id,
      },
    });
    pubSub.publish('folderCreated', { folderCreated: newFolder });
    return newFolder;
  }

  @Query(() => FolderConnection)
  async publishedFolders(
    @Args() { after, before, first, last }: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true })
    query: string,
    @Args({
      name: 'orderBy',
      type: () => FolderOrder,
      nullable: true,
    })
    orderBy: FolderOrder,
  ) {
    const a = await findManyCursorConnection(
      (args) =>
        this.prisma.folder.findMany({
          include: { author: true },
          where: {
            title: { contains: query || '' },
          },
          orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : undefined,
          ...args,
        }),
      () =>
        this.prisma.folder.count({
          where: {
            title: { contains: query || '' },
          },
        }),
      { first, last, before, after },
    );
    return a;
  }

  @Query(() => [Folder])
  userFolders(@Args('id') id: string) {
    return this.prisma.user.findUnique({ where: { id: id } }).folders();

    // or
    // return this.prisma.folders.findMany({
    //   where: {
    //     author: { id: id.userId }
    //   }
    // });
  }

  @Query(() => Folder)
  async folder(@Args('id') id: string) {
    return this.prisma.folder.findUnique({ where: { id } });
  }

  @ResolveField('author', () => User)
  async author(@Parent() folder: Folder) {
    return this.prisma.folder.findUnique({ where: { id: folder.id } }).author();
  }
}
