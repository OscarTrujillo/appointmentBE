import { Place } from './place';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Patient } from './patient';

@ObjectType()
export class Appointment {
  @Field()
  id: string;

  @Field()
  state: string;

  @Field((type) => Int)
  createdAt: number;

  @Field((type) => Patient)
  patient: Patient;

  @Field((type) => Int, { nullable: true })
  date?: number;

  @Field((type) => Place, { nullable: true })
  place?: Place;
}
