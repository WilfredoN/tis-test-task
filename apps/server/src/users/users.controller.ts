import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getAll(): string[] {
    // TODO: use API
    return [];
  }
}
