import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';
import { BaseModel } from '../../common/models/base.model';

@ObjectType()
export class Folder extends BaseModel {
  @Field()
  title: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => User, { nullable: true })
  author?: User | null;
}
