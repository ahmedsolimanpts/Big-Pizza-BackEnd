import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ATStrategy } from './Strategy/at.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTGuard } from './guards/jwt.guard';
import { APP_GUARD } from '@nestjs/core';
import { AdminController } from './admin/admin.controller';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_TOKEN_EXPIREIN') },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AuthController, AdminController],
  providers: [
    AuthService,
    ATStrategy,
    {
      provide: APP_GUARD,
      useClass: JWTGuard,
    },
  ],
  exports: [],
})
export class AuthModule {}
