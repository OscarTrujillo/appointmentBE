export enum AllowedState {
  Complete = 'COMPLETE',
  InProgress = 'IN_PROGRESS',
  Open = 'OPEN',
}

export interface IdbEmployee {
  id: string;
  name: string;
  email: string;
}
export interface IdbPatient {
  id: string;
  name: string;
  email: string;
  dni: string;
}
export interface IdbPlace {
  id: string;
  name: string;
  address: string;
  appointmentsPerDay: number;
}

export interface IdbAppointment {
  id: string;
  patientId: string;
  state: AllowedState;
  createdAt: number;

  date?: number;
  placeId?: string;
}

export interface DatabaseStructure {
  employees: IdbEmployee[];
  patients: IdbPatient[];
  places: IdbPlace[];
  appointments: IdbAppointment[];
}
