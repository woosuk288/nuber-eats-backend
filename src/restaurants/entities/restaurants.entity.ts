import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Restaurant {
  @Field()
  name: string;
  @Field()
  isVegan: string;
  @Field()
  address: string;
  @Field()
  ownerName: string;
}
