import { InputType, PartialType } from '@nestjs/graphql';
import { CreateRestaurantDto } from './createRestaurant.dto';

@InputType()
export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {} // required "id"
