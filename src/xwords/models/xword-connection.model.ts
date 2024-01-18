import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from '../../common/pagination/pagination';
import { Xword } from './xword.model';

@ObjectType()
export class XwordConnection extends PaginatedResponse(Xword) {}
