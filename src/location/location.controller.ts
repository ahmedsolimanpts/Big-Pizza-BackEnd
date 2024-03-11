import { Controller } from '@nestjs/common';
import { LocationService } from './location.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}
}
