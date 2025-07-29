import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  getAll(): Observable<User[]> {
    const apiUrl = this.configService.get<string>('usersApi');
    return this.httpService
      .get<{ results: User[] }>(`${apiUrl}/?results=10`)
      .pipe(map((response) => response.data.results));
  }
}
