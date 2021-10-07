import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PatientInput {
  @Field()
  id: string;
}
