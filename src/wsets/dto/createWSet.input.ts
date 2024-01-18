import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateWSetInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  folderId: string;

  @Field()
  description: string;

  
}
