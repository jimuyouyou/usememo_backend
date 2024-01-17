import { Module } from '@nestjs/common';
import { FoldersResolver } from './folders.resolver';

@Module({
  imports: [],
  providers: [FoldersResolver],
})
export class FoldersModule {}
