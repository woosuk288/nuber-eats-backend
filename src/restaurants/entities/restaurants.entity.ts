import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Category } from './category.entity';

@InputType('RestaurantInputType' /* { isAbstract: true } */)
@ObjectType()
@Entity()
export class Restaurant extends CoreEntity {
  @Field()
  @Column()
  @IsString()
  @Length(5, 15)
  name: string;

  @Field(() => String)
  @Column()
  @IsString()
  coverImg: string;

  @Field({ defaultValue: 'South Korea' })
  @Column()
  @IsString()
  address: string;

  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category, (category) => category.restaurants, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  category: Category;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.restaurants, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  owner: User;

  // @Field()
  // @Column()
  // categoryName?: string;
}
