import { IsNotEmpty, IsOptional } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateWordInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsOptional()
  titleLang: string;

  @Field()
  @IsOptional()
  description: string;

  @Field()
  @IsOptional()
  descLang: string;

  @Field()
  @IsOptional()
  img: string;

  @Field()
  @IsOptional()
  audio: string;

  @Field()
  @IsOptional()
  setId: string;
}
