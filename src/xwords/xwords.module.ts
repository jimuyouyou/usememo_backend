import { Module } from '@nestjs/common';
import { XwordsResolver } from './xwords.resolver';

@Module({
  imports: [],
  providers: [XwordsResolver],
})
export class XwordsModule {}
