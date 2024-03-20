import { Controller, Get } from '@nestjs/common';
import { NotificationsService } from '../service/notifications.service';
import { ApiTags } from '@nestjs/swagger';
import { EmailService } from '../service/email.service';
import { Public } from 'src/auth/decorator/IsPuplic.decorator';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly emailService: EmailService,
  ) {}

  @Public()
  @Get()
  findAll() {
    return this.emailService.hi();
  }
}
