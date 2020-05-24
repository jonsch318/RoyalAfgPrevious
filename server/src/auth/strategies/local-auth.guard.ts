import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Easier Access the local.strategy.ts. Wraps it into a Nest Guard
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard("local"){

}
