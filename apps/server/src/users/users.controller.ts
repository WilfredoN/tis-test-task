import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserDTO } from 'src/users/dto/User';
import { UsersService } from 'src/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll(): Promise<UserDTO[]> {
    return this.usersService.getAll();
  }

  @Get('saved')
  async getSavedUsers(): Promise<UserDTO[]> {
    return this.usersService.getSavedUsers();
  }

  @Post()
  async saveUser(@Body() user: UserDTO): Promise<UserDTO> {
    return this.usersService.saveUser(user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}
