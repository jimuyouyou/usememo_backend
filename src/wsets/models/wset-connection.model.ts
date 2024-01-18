import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from '../../common/pagination/pagination';
import { WSet } from './wset.model';

@ObjectType()
export class WSetConnection extends PaginatedResponse(WSet) {}
