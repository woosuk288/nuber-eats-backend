import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Restaurant } from './restaurants.entity';

@InputType('CategoryInputType' /* { isAbstract: true } */)
@ObjectType()
@Entity()
export class Category extends CoreEntity {
  @Field()
  @Column({ unique: true })
  @IsString()
  @Length(5, 15)
  name: string;

  @Field(() => String)
  @Column({ nullable: true })
  @IsString()
  coverImg: string;

  @Field()
  @Column({ unique: true })
  @IsString()
  slug: string;

  @Field(() => [Restaurant])
  @OneToMany(() => Restaurant, (restaurant) => restaurant.category)
  restaurants: Restaurant[];
}