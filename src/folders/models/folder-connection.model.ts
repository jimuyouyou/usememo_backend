import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from '../../common/pagination/pagination';
import { Folder } from './folder.model';

@ObjectType()
export class FolderConnection extends PaginatedResponse(Folder) {}
