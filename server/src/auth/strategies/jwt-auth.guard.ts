import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

/**
 * Easier access to the jwt.strategy.ts. We just wrap it in a guard
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt"){
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      return super.canActivate(context);
  }
}
