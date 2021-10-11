import { Place } from './place';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Patient } from './patient';

@ObjectType()
export class Appointment {
  @Field()
  id: string;

  @Field()
  state: string;

  @Field((type) => Float)
  createdAt: number;

  @Field((type) => Patient)
  patient: Patient;

  @Field((type) => Float, { nullable: true })
  date?: number;

  @Field((type) => Place, { nullable: true })
  place?: Place;
}
