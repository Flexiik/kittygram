import { BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException } from "@nestjs/common";
import { User } from "@prisma/client";
import { UserService } from "src/service/user.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";

@Controller("/auth")
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post("/register")
  async register(
    @Body() registerData: { name: string; email: string; password: string },
  ): Promise<User> {
    const { name, email, password } = registerData;

    if (await this.userService.user({ email }))
      throw new BadRequestException("User Already Exists");

    const secondHash = await bcrypt.hash(password, 5);

    const user = await this.userService.createUser({
      name,
      email,
      password: secondHash,
    });

    delete user.password

    return user;
  }

  @Post("/login")
  async login(
    @Body() loginData: { email: string; password: string },
    @Res({ passthrough: true }) response: Response
  ): Promise<any> {
    const { email, password } = loginData;
    const user = await this.userService.user({ email });

    if (!user) throw new BadRequestException("Invalid Credentials");

    if (!(await bcrypt.compare(password, user.password)))
      throw new BadRequestException("Invalid Credentials");

    const jwt = await this.jwtService.signAsync({id: user.id});

    response.cookie('jwt', jwt, {httpOnly: true, sameSite: false})

    return {
        message: 'Success!'
    };
  }

  @Get('/user')
  async user(@Req() request: Request) {
    try {
        const cookie = request.cookies['jwt'];

        const data = await this.jwtService.verifyAsync(cookie);
        
        if(!data) {
            throw new UnauthorizedException();
        }

        const user = await this.userService.user({ id: data['id'] })
        
        delete user.password;

        return user;
    } catch (e) {
        throw new UnauthorizedException();
    }
    }

    @Post('/logout')
    async logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('jwt');

        return {
            message: "Success!"
        }
    }
}