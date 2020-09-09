import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Player } from './player/player.entity';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): Player => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
