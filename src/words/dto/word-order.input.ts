import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from '../../common/order/order';

export enum WordOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  title = 'title',
  description = 'description',
}

registerEnumType(WordOrderField, {
  name: 'WordOrderField',
  description: 'Properties by which connections can be ordered.',
});

@InputType()
export class WordOrder extends Order {
  @Field(() => WordOrderField)
  field: WordOrderField;
}
