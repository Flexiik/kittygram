import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "src/service/user.service";

import { User as UserModel } from "@prisma/client";

@Controller('/api/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAllUsers() {
        return this.userService.users({
            where: {}
        });
    }

    @Get('/:id')
    async getUserById(@Param('id') id: string): Promise<UserModel> {
        return this.userService.user({ id: Number(id)});
    }

    @Post()
    async createUser(@Body() userData: {email: string, name: string, password: string}): Promise<UserModel> {
        return this.userService.createUser(userData)
    }

    @Put('/:id')
    async updateUser(@Body() updateData: {email?: string, name?: string, password?: string}, @Param('id') id: string): Promise<UserModel> {
        return this.userService.updateUser({
            where: {id: Number(id)},
            data: updateData
        })
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: string): Promise<UserModel> {
        return this.userService.deleteUser({ id: Number(id)})
    }

}