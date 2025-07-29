import { Controller, Get } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Observable } from 'rxjs';
import { User } from 'src/users/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(): Observable<User[]> {
    return this.usersService.getAll();
  }
}
