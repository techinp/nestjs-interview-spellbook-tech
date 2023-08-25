import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EntityNotFoundErrorFilter } from './utils/filters/entity-not-found.filter';
import { EntityInvalidFilter } from './utils/filters/entity-invalid.filter';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';

export function mainConfig(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(
    new EntityNotFoundErrorFilter(),
    new EntityInvalidFilter(),
  );

  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)));
}
