import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurants.entity';
import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
} from './dtos/createRestaurant.dto';
import { User } from 'src/users/entities/user.entity';
import { Category } from './entities/category.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurant: Repository<Restaurant>,
    @InjectRepository(Category)
    private readonly categories: Repository<Category>,
  ) {}

  async createRestaurant(
    owner: User,
    createRestaurantInput: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    try {
      console.log('newRestaurant : ', createRestaurantInput);
      const newRestaurant = this.restaurant.create(createRestaurantInput);
      newRestaurant.owner = owner;
      const categoryName = createRestaurantInput.categoryName
        .trim()
        .toLowerCase();
      const categorySlug = categoryName.replace(/ /g, '-');
      let category = await this.categories.findOne({ slug: categorySlug });
      if (!category) {
        category = await this.categories.save(
          this.categories.create({ slug: categorySlug, name: categoryName }),
        );
      }

      await this.restaurant.save(newRestaurant);
      return { ok: true };
    } catch (error) {
      console.log(error);
      return { ok: false, error: 'Could not create restaurant' };
    }
  }
}
