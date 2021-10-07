import * as db from '../../db';

export class PlaceService {
  getPlaces() {
    return db.getPlaces();
  }
}
