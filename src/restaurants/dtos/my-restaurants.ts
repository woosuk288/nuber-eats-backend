import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Restaurant } from '../entities/restaurants.entity';

@ObjectType()
export class MyRestaurantsOutput extends CoreOutput {
  @Field(() => [Restaurant])
  restaurants?: Restaurant[];
}
