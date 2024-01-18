import { Module } from '@nestjs/common';
import { WSetsResolver } from './wsets.resolver';

@Module({
  imports: [],
  providers: [WSetsResolver],
})
export class WSetsModule {}
