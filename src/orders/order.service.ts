import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dish } from 'src/restaurants/entities/dish.entity';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateOrderInput, CreateOrderOutput } from './dtos/create-order.dto';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orders: Repository<Order>,
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
    @InjectRepository(Order) private readonly orderItems: Repository<OrderItem>,
    @InjectRepository(Order) private readonly dishes: Repository<Dish>,
  ) {}

  async createOrder(
    customer: User,
    { restaurantId, items }: CreateOrderInput,
  ): Promise<CreateOrderOutput> {
    try {
      const restaurant = await this.restaurants.findOne(restaurantId);
      if (!restaurant) {
        return { ok: false, error: 'Restaurant not found.' };
      }
      items.forEach(async (item) => {
        const dish = await this.dishes.findOne(item.dishId);
        if (dish) {
          // about this whole thing
        }
        await this.orderItems.save(
          this.orderItems.create({ dish, options: item.options }),
        );
      });

      // const order = await this.orders.save(
      //   this.orders.create({ customer, restaurant }),
      // );
      // console.log(order);
    } catch (error) {
      return { ok: false, error: 'Could not order' };
    }
  }
}
