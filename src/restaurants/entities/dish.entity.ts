import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Restaurant } from './restaurants.entity';

@InputType('DishInputType' /* { isAbstract: true } */)
@ObjectType()
@Entity()
export class Dish extends CoreEntity {
  @Field()
  @Column()
  @IsString()
  @Length(5)
  name: string;

  @Field()
  @Column()
  @IsNumber()
  price: number;

  @Field()
  @Column()
  @IsString()
  photo: string;

  @Field()
  @Column()
  @Length(5, 140)
  description: string;

  @Field(() => Restaurant)
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menu, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @RelationId((dish: Dish) => dish.restaurant)
  restaurantId: number;
}
