import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConfigName } from '../../enum';
import { IAppConfig } from '../../interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<IAppConfig>(ConfigName.App).jwtSecret,
        signOptions: {
          expiresIn: configService.get<IAppConfig>(ConfigName.App)
            .jwtExpiredTime,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  // providers: [AuthService, LocalStrategy],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
