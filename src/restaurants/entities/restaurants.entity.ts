import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// @InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Field()
  @Column()
  @IsString()
  @Length(5, 15)
  name: string;

  @Field({ nullable: true })
  @Column({ default: true })
  @IsOptional()
  @IsBoolean()
  isVegan: boolean;

  @Field({ defaultValue: 'South Korea' })
  @Column()
  @IsString()
  address: string;

  // @Field()
  // @Column()
  // ownerName?: string;

  // @Field()
  // @Column()
  // categoryName?: string;
}
