import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const user = instanceToPlain(context.switchToHttp().getRequest().user);
    return user;
  },
);

export const GetPayload = createParamDecorator(
  (data: unknown, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
