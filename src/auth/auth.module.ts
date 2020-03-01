import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth/auth.controller';
import { LocalAuthGuard } from './strategies/local-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './strategies/jwt-auth.guard';

@Module({
  imports:
    [
      PassportModule.register({defaultStrategy: "jwt"}),
      JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: {
          expiresIn: "7d",
        }
      }),
      UserModule,
    ],
  controllers: [AuthController],
  providers:
    [
      AuthService,
      LocalStrategy,
      LocalAuthGuard,
      JwtStrategy,
      JwtAuthGuard,
    ],
  exports: [AuthService]
})
export class AuthModule {

}
