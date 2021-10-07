import { JSONFile, Low } from 'lowdb';
import { Appointment } from 'src/appointments/models/appointment';
import { AllowedState, DatabaseStructure, IdbAppointment } from './interfaces';

const adapter = new JSONFile<DatabaseStructure>('db.json');
export const db = new Low(adapter);

db.read();

db.data ||= { employees: [], patients: [], places: [], appointments: [] };

export const buildAppointmentResponse = (a: IdbAppointment) => {
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
