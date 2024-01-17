import { InputType, ArgsType } from '@nestjs/graphql';

@ArgsType()
// @InputType()
export class PaginationArgs {
  skip?: number;

  after?: string;

  before?: string;

  first?: number;

  last?: number;
}
