import { Module } from '@nestjs/common';
import { WordsResolver } from './words.resolver';

@Module({
  imports: [],
  providers: [WordsResolver],
})
export class WordsModule {}
