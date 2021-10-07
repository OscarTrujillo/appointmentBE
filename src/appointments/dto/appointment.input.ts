import { Int, Field, InputType, ArgsType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export class ListAppointmentInput {
  @Field()
  placeId: string;

  @Field((type) => Int, { nullable: true })
  date?: number;
}

@InputType()
@ArgsType()
export class NewAppointmentInput {
  @Field()
  patientId: string;
  @Field({ nullable: true })
  placeId?: string;
}

@InputType()
@ArgsType()
export class ConfirmAppointmentInput {
  @Field()
  appointmentId: string;
}

@InputType()
@ArgsType()
export class ValidateAppointmentInput {
  @Field()
  appointmentId: string;
}
