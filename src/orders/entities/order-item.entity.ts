import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import {
  Dish,
  DishChoice,
  DishOption,
} from 'src/restaurants/entities/dish.entity';

@InputType('OrderItemOptionInputType' /* { isAbstract: true } */)
@ObjectType()
export class OrderItemOption {
  @Field()
  name: string;

  @Field({ nullable: true })
  choice?: string;

  @Field({ nullable: true })
  extra?: number;
}

@InputType('OrderItemInputType')
@ObjectType()
@Entity()
export class OrderItem extends CoreEntity {
  @ManyToOne(() => Dish, { nullable: true, onDelete: 'CASCADE' })
  dish: Dish;

  @Field(() => [OrderItemOption], { nullable: true })
  @Column({ type: 'json', nullable: true })
  options?: OrderItemOption[];
}
