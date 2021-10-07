import { PlaceService } from './../services/places.service';
import { Resolver, Query } from '@nestjs/graphql';
import { Place } from '../models/place';

@Resolver()
export class PlaceResolver {
  constructor(private placeService: PlaceService) {}

  @Query((returns) => [Place])
  async places() {
    return await this.placeService.getPlaces();
  }

  // todo: add mutation to add place
}
