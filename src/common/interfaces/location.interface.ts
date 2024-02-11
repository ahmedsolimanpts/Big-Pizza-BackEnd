export interface Location {
  country: string;
  city: string;
  district: string;
  neighborhood: string;
  street_Address: string;
  building_Number: string;
  floor: string;
  description: string;
  cordinates: { long: number; lat: number };
}
