import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateFolderInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  description: string;
}
