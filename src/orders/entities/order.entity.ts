import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Dish } from 'src/restaurants/entities/dish.entity';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

export enum OrderStatus {
  Pending = 'Pending',
  Cooking = '  Cooking',
  PickedUp = '  PickedUp',
  Delivered = '  Delivered',
}

registerEnumType(OrderStatus, { name: 'OrderStatus' });

@InputType()
@ObjectType('OrderInputType')
@Entity()
export class Order extends CoreEntity {
  @Field({ nullable: true })
  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  customer?: User;

  @Field({ nullable: true }) //at the moment you just ordered
  @ManyToOne(() => User, (user) => user.rides, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  driver?: User;

  @Field(() => Restaurant)
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.orders, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  restaurant?: Restaurant;

  @Field(() => [Dish])
  @ManyToMany(() => Dish)
  @JoinTable()
  dishes: Dish[];

  @Column()
  @Field()
  total: number;

  @Column({ type: 'enum', enum: OrderStatus })
  @Field(() => OrderStatus)
  status: OrderStatus;
}
