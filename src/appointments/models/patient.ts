import { ObjectType, Field } from '@nestjs/graphql';
import { User } from './user';

@ObjectType()
export class Patient extends User {
  @Field()
  dni: string;
}
