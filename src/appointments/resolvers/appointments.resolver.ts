import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AppointmentService } from '../services/appointments.service';
import {
  NewAppointmentInput,
  ListAppointmentInput,
  ConfirmAppointmentInput,
  ValidateAppointmentInput,
} from '../dto/appointment.input';
import { Appointment } from '../models/appointment';

@Resolver()
export class AppointmentResolver {
  constructor(private appointmentService: AppointmentService) {}

  // queries
  @Query((returns) => [Appointment])
  async getAppointmentsByPlace(@Args() args: ListAppointmentInput) {
    return await this.appointmentService.getAppointmentsByPlace(args);
  }

  @Query((returns) => Appointment)
  async getAppointmentByUser(@Args('id') id: string) {
    return await this.appointmentService.getAppointmentByUser(id);
  }

  // mutations
  @Mutation((returns) => Appointment)
  addAppointment(@Args() newAppointment: NewAppointmentInput) {
    var cow = this.appointmentService.addAppointment(newAppointment);
    return cow;
  }

  @Mutation((returns) => Appointment)
  confirmAppointment(@Args() confirmAppointment: ConfirmAppointmentInput) {
    var cow = this.appointmentService.confirmAppointment(confirmAppointment);
    return cow;
  }

  @Mutation((returns) => Appointment)
  validateAppointment(@Args() validateAppointment: ValidateAppointmentInput) {
    var cow = this.appointmentService.validateAppointment(validateAppointment);
    return cow;
  }
}
