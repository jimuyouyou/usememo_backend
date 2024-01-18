import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateXwordInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  titleLang: string;

  @Field()
  description: string;

  @Field()
  descLang: string;

  @Field()
  img: string;

  @Field()
  audio: string;
}
