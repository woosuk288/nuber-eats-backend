import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Category } from '../entities/category.entity';

@ArgsType()
export class CategoryInput {
  @Field()
  slug: string;
}

@ObjectType()
export class CategoryOutput extends CoreOutput {
  @Field({ nullable: true })
  category?: Category;
}
