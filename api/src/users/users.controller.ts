import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { hasRoles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guards';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post()  //  pour utilisateur simple
  async addUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('widgets') widgets: []
  ) {
    const newUser = await this.usersService.insertUser(
      name,
      email,
      password,
      widgets
    );
    return { "new_user_id": newUser };
  }


  @UseGuards(JwtAuthGuard)
  @Get('admin')    //  pour admin
  async getAllUsers() {
    const users = await this.usersService.getUsers();
    return users;
  }


  @UseGuards(JwtAuthGuard)
  @Get('admin/:id')   //  pour admin
  getUser(@Param('id') userId: string) {
    return this.usersService.getSingleUser(userId);
  }




  @Patch(':id')   //  pour utilisateur simple
  async updateUser(
    @Param('id') userId: string,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('widgets') widgets: []
  ) {
    const update = await this.usersService.updateUser(
      userId,
      name,
      email,
      password,
      widgets,
    );
    return update;
  }

  /* @Get('suggestions/:userId')
  async getSuggestion(
    @Param('userId') userId: string
  ) {
    const suggestions = await this.usersService.getSuggestion(userId);
    return suggestions;
  } */

  @Delete('admin/:id')   //  pour admin
  async removeUser(@Param('id') prodId: string) {
    await this.usersService.deleteUser(prodId);
    return null;
  }
}