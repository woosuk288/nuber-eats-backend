import { InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Restaurant } from '../entities/restaurants.entity';

@InputType()
export class CreateRestaurantInput extends OmitType(
  Restaurant,
  ['id', 'category', 'owner'], // owner는 로그인한 유저가 자동으로 입력되도록 해야함
  InputType,
) {}

@ObjectType()
export class CreateRestaurantOutput extends CoreOutput {}
