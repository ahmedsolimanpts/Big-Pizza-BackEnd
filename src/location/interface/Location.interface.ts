export class CoordinatesInteface {
  long?: number;

  lat?: number;
}

export interface LocationInterface {
  name?: string;

  country?: string;

  city?: string;

  district?: string;

  neighborhood?: string;

  street_Address?: string;

  building_Number?: string;

  floor?: string;

  description?: string;

  cordinates?: CoordinatesInteface;
}
