import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Post('create')
  async create(@Body('email') email: string, @Body('password') password: string) {
    return this.userService.createUser(email, password);
  }
}
