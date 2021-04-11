import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Restaurant } from './restaurants.entity';

@InputType('DishChoiceInputType')
@ObjectType()
export class DishChoice {
  @Field()
  name: string;
  @Field({ nullable: true })
  extra?: number;
}

@InputType('DishOptionInputType' /* { isAbstract: true } */)
@ObjectType()
export class DishOption {
  @Field()
  name: string;

  @Field(() => [DishChoice], { nullable: true })
  choices?: DishChoice[];

  @Field({ nullable: true })
  extra?: number;
}

@InputType('DishInputType' /* { isAbstract: true } */)
@ObjectType()
@Entity()
export class Dish extends CoreEntity {
  @Field()
  @Column()
  @IsString()
  @Length(1)
  name: string;

  @Field()
  @Column()
  @IsNumber()
  price: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsString()
  photo?: string;

  @Field()
  @Column()
  @Length(1, 140)
  description: string;

  @Field(() => Restaurant)
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menu, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  restaurant: Restaurant;

  @RelationId((dish: Dish) => dish.restaurant)
  restaurantId: number;

  @Field(() => [DishOption], { nullable: true })
  @Column({ type: 'json', nullable: true })
  options?: DishOption[];
}
