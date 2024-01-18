import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from '../../common/pagination/pagination';
import { Word } from './word.model';

@ObjectType()
export class WordConnection extends PaginatedResponse(Word) {}
