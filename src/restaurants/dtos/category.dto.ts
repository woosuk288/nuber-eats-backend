import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';
import { Category } from '../entities/category.entity';
import { Restaurant } from '../entities/restaurants.entity';

@InputType()
export class CategoryInput extends PaginationInput {
  @Field()
  slug: string;
}

@ObjectType()
export class CategoryOutput extends PaginationOutput {
  @Field(() => [Restaurant], { nullable: true })
  restaurants?: Restaurant[];

  @Field({ nullable: true })
  category?: Category;
}
