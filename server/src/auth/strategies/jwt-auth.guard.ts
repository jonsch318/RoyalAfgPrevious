import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt"){
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      return super.canActivate(context);
  }

  handleRequest(err, user, info): any{
    if(err || !user) {
      Logger.error(`Error was thrown during JwtAuthGuard handleRequest.`)
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
