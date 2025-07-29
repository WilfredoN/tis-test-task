import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Observable } from 'rxjs';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/User';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(): Observable<User[]> {
    return this.usersService.getAll();
  }

  @Get('saved')
  async getSavedUsers(): Promise<User[]> {
    return this.usersService.getSavedUsers();
  }

  @Post()
  async saveUser(@Body() user: CreateUserDto): Promise<User> {
    return this.usersService.saveUser(user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}
