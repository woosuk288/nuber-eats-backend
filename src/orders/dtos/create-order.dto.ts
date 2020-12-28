import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { DishOption } from 'src/restaurants/entities/dish.entity';

@InputType()
class CreateOrderitemInput {
  @Field()
  dishId: number;

  @Field(() => [DishOption], { nullable: true })
  options?: DishOption[];
}

@InputType()
export class CreateOrderInput {
  @Field()
  restaurantId: number;

  @Field(() => [CreateOrderitemInput])
  items: CreateOrderitemInput[];
}

@ObjectType()
export class CreateOrderOutput extends CoreOutput {}
