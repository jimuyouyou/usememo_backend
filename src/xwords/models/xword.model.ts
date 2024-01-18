import { Field, ObjectType } from '@nestjs/graphql';
import { WSet } from '../../wsets/models/wset.model';
import { BaseModel } from '../../common/models/base.model';

@ObjectType()
export class Xword extends BaseModel {
  @Field()
  title: string;

  @Field(() => String, { nullable: true })
  titleLang?: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => String, { nullable: true })
  descLang?: string | null;

  @Field(() => String, { nullable: true })
  img?: string | null;

  @Field(() => String, { nullable: true })
  audio?: string | null;

  @Field(() => WSet, { nullable: true })
  wset?: WSet | null;
}
