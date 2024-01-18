import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from '../../common/order/order';

export enum WSetOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  title = 'title',
  description = 'description',
}

registerEnumType(WSetOrderField, {
  name: 'WSetOrderField',
  description: 'Properties by which connections can be ordered.',
});

@InputType()
export class WSetOrder extends Order {
  @Field(() => WSetOrderField)
  field: WSetOrderField;
}
