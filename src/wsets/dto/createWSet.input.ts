import { IsNotEmpty, IsOptional } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateWSetInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsOptional()
  folderId: string;

  @Field()
  @IsOptional()
  description: string;
}
