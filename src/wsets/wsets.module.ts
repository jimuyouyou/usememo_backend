import { Module } from '@nestjs/common';
import { WsetsResolver } from './wsets.resolver';

@Module({
  imports: [],
  providers: [WsetsResolver],
})
export class WsetsModule {}
