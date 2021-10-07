import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Place {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  address: string;

  @Field((type) => Int)
  appointmentsPerDay: number;
}
