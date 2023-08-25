import { registerAs } from '@nestjs/config';
import { ConfigName } from '../src/enum';
import { IAppConfig } from '../src/interface';

export const appConfig = registerAs(
  ConfigName.App,
  (): IAppConfig => ({
    env: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiredTime: process.env.JWT_ACCESS_EXPIRATION,
  }),
);
