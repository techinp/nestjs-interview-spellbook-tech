import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const user = instanceToPlain(context.switchToHttp().getRequest().user);

    console.log('user CurrentUser :', user);
    return user;
  },
);

export const GetPayload = createParamDecorator(
  (data: unknown, context: ExecutionContext): string => {
    console.log('data :', data);
    const request = context.switchToHttp().getRequest();
    console.log('request :', request.user);
    return request.user;
  },
);
