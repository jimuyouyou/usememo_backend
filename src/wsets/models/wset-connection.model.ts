import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from '../../common/pagination/pagination';
import { Wset } from './wset.model';

@ObjectType()
export class WsetConnection extends PaginatedResponse(Wset) {}
