import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { DishOption } from 'src/restaurants/entities/dish.entity';
import { OrderItemOption } from '../entities/order-item.entity';

@InputType()
class CreateOrderitemInput {
  @Field()
  dishId: number;

  @Field(() => [OrderItemOption], { nullable: true })
  options?: OrderItemOption[];
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
