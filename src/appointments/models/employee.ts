import { ObjectType, Field } from '@nestjs/graphql';
import { User } from './user';

@ObjectType()
export class Employee extends User {
  @Field()
  dni: string;
}
