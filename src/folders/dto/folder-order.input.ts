import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from '../../common/order/order';

export enum FolderOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  published = 'published',
  title = 'title',
  description = 'description',
}

registerEnumType(FolderOrderField, {
  name: 'FolderOrderField',
  description: 'Properties by which connections can be ordered.',
});

@InputType()
export class FolderOrder extends Order {
  @Field(() => FolderOrderField)
  field: FolderOrderField;
}
