import { db } from 'src/db';

export class PlaceService {
  getPlaces() {
    const places = db.data?.places || [];

    return places;
  }
}
