import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from '../../common/order/order';

export enum WsetOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  title = 'title',
  description = 'description',
}

registerEnumType(WsetOrderField, {
  name: 'WsetOrderField',
  description: 'Properties by which connections can be ordered.',
});

@InputType()
export class WsetOrder extends Order {
  @Field(() => WsetOrderField)
  field: WsetOrderField;
}
