import { PlaceResolver } from './resolvers/places.resolver';
import { PlaceService } from './services/places.service';
import { Module } from '@nestjs/common';
import { AppointmentResolver } from './resolvers/appointments.resolver';
import { AppointmentService } from './services/appointments.service';

@Module({
  providers: [
    // resolvers
    AppointmentResolver,
    PlaceResolver,
    // services
    PlaceService,
    AppointmentService,
  ],
})
export class AppointmentsModule {}
