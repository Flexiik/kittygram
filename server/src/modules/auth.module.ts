import { Module } from "@nestjs/common";
import { AuthController } from "src/controller/auth.controller";
import { UserService } from "src/service/user.service";
import { PrismaModule } from "./prisma.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {expiresIn: '1d'}
    }),
  ],
  controllers: [AuthController],
  providers: [UserService],
  exports: [UserService],
})
export class AuthModule {}