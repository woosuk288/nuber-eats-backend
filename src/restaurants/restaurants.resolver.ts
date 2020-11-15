import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { createRestaurantDto } from './dtos/createRestaurant.dto';
import { Restaurant } from './entities/restaurants.entity';

@Resolver()
export class RestaurantResolver {
  @Query(() => [Restaurant]) // required for graphql
  restaurants(@Args('veganOnly') veganOnly: boolean) {
    return [];
  }
  @Mutation(() => Boolean)
  createRestaurant(@Args() createRestaurantDto: createRestaurantDto) {
    return true;
  }
}
