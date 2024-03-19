import { Module } from '@nestjs/common';
import { NotificationsService } from './service/notifications.service';
import { NotificationsController } from './controller/notifications.controller';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
