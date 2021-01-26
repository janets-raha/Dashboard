import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
// import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findAuth(username);
  //   if (user && user.password === pass) {
  //     const { password, ...result } = user;
  //     console.log("test", user);
  //     return result;
  //   }
  //   return null;
  // }

  // validate with hashed pwd
  async validateUser(username: string, pass: string): Promise<any> {
    const bcrypt = require('bcrypt');
    const user = await this.usersService.findAuth(username);
    const pwdMatch = await bcrypt.compare(pass, user.password)
    if (user && pwdMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  /*   async login(user: any) {
      const payload = { username: user.username, sub: user.userId };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } */
}