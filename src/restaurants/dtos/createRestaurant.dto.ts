import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsString, Length } from 'class-validator';

@ArgsType()
export class createRestaurantDto {
  @IsString()
  @Field()
  @Length(3, 10)
  name: string;

  @IsBoolean()
  @Field()
  isVegan: boolean;

  @IsString()
  @Field()
  address: string;

  @IsString()
  @Field()
  ownerName: string;
}
