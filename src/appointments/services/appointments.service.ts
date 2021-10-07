import { Appointment } from 'src/appointments/models/appointment';
import { buildAppointmentResponse, db } from '../../db';
import {
  ConfirmAppointmentInput,
  ListAppointmentInput,
  NewAppointmentInput,
  ValidateAppointmentInput,
} from '../dto/appointment.input';
import { AllowedState, IdbAppointment } from 'src/db/interfaces';
import { v4 as uuid } from 'uuid';

export class AppointmentService {
  // todo: add checks

  getAppointmentsByPlace(args: ListAppointmentInput) {
    const dbAppointments =
      db.data?.appointments.filter((a) => a.placeId === args.placeId) || [];
    const appointments: Appointment[] = [];
    dbAppointments.forEach((a) => {
      const appointment = buildAppointmentResponse(a);
      appointments.push(appointment);
    });
    return appointments;
  }

  getAppointmentByUser(id: string) {
    const dbAppointment = db.data?.appointments.find((a) => {
      return a.patientId === id;
    });
    if (dbAppointment) {
      return buildAppointmentResponse(dbAppointment as IdbAppointment);
    }
    return null;
  }

  async addAppointment(args: NewAppointmentInput) {
    const patient = db.data?.patients.find((c) => c.id === args.patientId);
    if (!patient) {
      throw new Error('patient doesn`t exist');
    }
    const appointemt = db.data?.appointments.find(
      (c) => c.patientId === args.patientId,
    );
    if (appointemt) {
      // appointment exists
      // todo: check if appointment date is old
      return buildAppointmentResponse(appointemt);
    }
    let place = args.placeId
      ? db.data?.places.find((c) => c.id === args.placeId)
      : undefined;
    if (!place) {
      throw new Error('place doesn`t exist');
    } else {
      // if not place assign one
      // todo: select less bussy place
      place = db.data?.places[0];
    }

    const dbAppointment: IdbAppointment = {
      id: uuid(),
      patientId: args.patientId,
      state: AllowedState.Open,
      createdAt: Date.now(),
      placeId: place?.id,
    };

    db.data?.appointments.push(dbAppointment);
    await db.write();

    return buildAppointmentResponse(dbAppointment);
  }

  async confirmAppointment(args: ConfirmAppointmentInput) {
    const appointemt = db.data?.appointments.find(
      (c) => c.id === args.appointmentId,
    );
    if (!appointemt) {
      throw new Error('appointemt doesn`t exist');
    }
    if (appointemt.state !== AllowedState.Open) {
      throw new Error('appointemt in a wrong state');
    }
    // todo: assign next available date
    const today = new Date();
    appointemt.date = new Date(today.getDate() + 1).getTime();
    appointemt.state = AllowedState.InProgress;
    await db.write();

    return buildAppointmentResponse(appointemt);
  }

  async validateAppointment(args: ValidateAppointmentInput) {
    const appointemt = db.data?.appointments.find(
      (c) => c.id === args.appointmentId,
    );
    if (!appointemt) {
      throw new Error('appointemt doesn`t exist');
    }
    if (appointemt.state !== AllowedState.InProgress) {
      throw new Error('appointemt in a wrong state');
    }
    appointemt.state = AllowedState.Complete;
    // todo: add validatedBy to have the trace
    await db.write();

    return buildAppointmentResponse(appointemt);
  }
}
