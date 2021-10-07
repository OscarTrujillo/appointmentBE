import {
  ConfirmAppointmentInput,
  ListAppointmentInput,
  NewAppointmentInput,
  ValidateAppointmentInput,
} from '../dto/appointment.input';
import * as db from '../../db';

export class AppointmentService {
  // todo: add checks

  getAppointmentsByPlace(args: ListAppointmentInput) {
    return db.getAppointmentsByPlace(args);
  }

  getAppointmentByUser(id: string) {
    return db.getAppointmentByUser(id);
  }

  addAppointment(args: NewAppointmentInput) {
    return db.addAppointment(args);
  }

  confirmAppointment(args: ConfirmAppointmentInput) {
    return db.confirmAppointment(args);
  }

  validateAppointment(args: ValidateAppointmentInput) {
    return db.validateAppointment(args);
  }
}
