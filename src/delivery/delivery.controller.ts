import { Controller } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('delivery')
@Controller('delivery')
export class DeliveryController {}
