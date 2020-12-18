import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Category } from './category.entity';

// @InputType({ isAbstract: true })
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

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.restaurants)
  category: Category;

  // @Field()
  // @Column()
  // ownerName?: string;

  // @Field()
  // @Column()
  // categoryName?: string;
}
