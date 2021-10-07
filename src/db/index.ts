import {
  ConfirmAppointmentInput,
  ListAppointmentInput,
  NewAppointmentInput,
  ValidateAppointmentInput,
} from './../appointments/dto/appointment.input';
import { JSONFile, Low } from 'lowdb';
import { Appointment } from 'src/appointments/models/appointment';
import { AllowedState, DatabaseStructure, IdbAppointment } from './interfaces';
import { v4 as uuid } from 'uuid';
import { Place } from 'src/appointments/models/place';

const adapter = new JSONFile<DatabaseStructure>('db.json');
const db = new Low(adapter);

db.read();

db.data ||= { employees: [], patients: [], places: [], appointments: [] };

const buildAppointmentResponse = (a: IdbAppointment) => {
  const patient = db.data?.patients.find((p) => p.id === a.patientId);

  if (!patient) {
    throw new Error('data corrupted');
  }

  const appointment: Appointment = {
    id: a.id,
    state: a.state as AllowedState,
    createdAt: a.createdAt,
    date: a.date,
    patient,
  };

  if (a.placeId) {
    const place = db.data?.places.find((p) => p.id === a.placeId);
    appointment.place = place;
  }
  return appointment;
};

export async function getAppointmentsByPlace(
  args: ListAppointmentInput,
): Promise<Appointment[]> {
  const dbAppointments =
    db.data?.appointments.filter((a) => a.placeId === args.placeId) || [];
  const appointments: Appointment[] = [];
  dbAppointments.forEach((a) => {
    const appointment = buildAppointmentResponse(a);
    appointments.push(appointment);
  });
  return appointments;
}

export async function getAppointmentByUser(id: string): Promise<Appointment> {
  const dbAppointment = db.data?.appointments.find((a) => {
    return a.patientId === id;
  });
  if (dbAppointment) {
    return buildAppointmentResponse(dbAppointment as IdbAppointment);
  }
  return null;
}

export async function addAppointment(
  args: NewAppointmentInput,
): Promise<Appointment> {
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

export async function confirmAppointment(
  args: ConfirmAppointmentInput,
): Promise<Appointment> {
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

  return buildAppointmentResponse(appointemt);
}

export async function validateAppointment(
  args: ValidateAppointmentInput,
): Promise<Appointment> {
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

  return buildAppointmentResponse(appointemt);
}

export async function getPlaces(): Promise<Place[]> {
  const places = db.data?.places || [];

  return places;
}
