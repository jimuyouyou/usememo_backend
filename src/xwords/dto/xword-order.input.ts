import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from '../../common/order/order';

export enum XwordOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  title = 'title',
  description = 'description',
}

registerEnumType(XwordOrderField, {
  name: 'XwordOrderField',
  description: 'Properties by which connections can be ordered.',
});

@InputType()
export class XwordOrder extends Order {
  @Field(() => XwordOrderField)
  field: XwordOrderField;
}
