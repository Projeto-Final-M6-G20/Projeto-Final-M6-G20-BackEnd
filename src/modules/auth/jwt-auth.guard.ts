import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    const request = context.switchToHttp().getRequest();
    const paramId = request.params.id;
    const paramEmail = request.params.email;

    if (paramId && user.id !== paramId) {
      throw new ForbiddenException();
    }
    if (paramEmail && user.email !== paramEmail) {
      throw new ForbiddenException();
    }

    return user;
  }
}
