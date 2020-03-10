import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/user-schema';
import { UserService } from './services/user/user.service';
import { MyAccountController } from './controllers/my-account/my-account.controller';
@Module({
  imports: [
    MongooseModule.forFeature([{name: "User", schema: UserSchema}]),
  ],
  exports: [
    MongooseModule,
    UserService,
  ],
  providers: [UserService],
  controllers: [MyAccountController]

})
export class UserModule {}
