import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Translation {
  @Field()
  original: string;

  @Field()
  translated: string;
}
