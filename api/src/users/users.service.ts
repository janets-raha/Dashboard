import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
//import { Widget } from '../widgets/widget.model';
import { User } from './user.model';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    //@InjectModel('Widget') private readonly widgetModel: Model<Widget>
  ) { }

  async insertUser(
    name: string,
    email: string,
    password: string,
    widgets: []
  ) {
    const bcrypt = require('bcrypt');
    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      name,
      email,
      password: hashedPwd,
      widgets
    });
    try {
      const result = await newUser.save();
      return result.id;
    } catch (error) {
      throw new NotAcceptableException("Email already used.");
    }


  }



  async getUsers() {
    const users = await this.userModel.find().exec();
    return users.map(users => ({
      id: users.id,
      name: users.name,
      email: users.email,
      password: users.password,
      widgets: users.widgets
    }));
  }



  async getSingleUser(userId: string) {
    const user = await this.findUser(userId);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      widgets: user.widgets
    };
  }


  /* async getWidgets(userId: string) {
    const user = await this.userModel.find({ _id: userId }, { favorites: 1, _id: 0 });
    const widIds = user[0].widgets.map((wid: any) => wid.id);
    const sugg = await this.widgetModel.find({ _id: { $in: widIds } });
    return sugg;
  } */

  async updateUser(
    userId?: string,
    name?: string,
    email?: string,
    password?: string,
    widgets?: []
  ) {
    const updatedUser = await this.findUser(userId);
    if (name) {
      updatedUser.name = name;
    }
    if (email) {
      updatedUser.email = email;
    }
    if (password) {
      const bcrypt = require('bcrypt');
      const hashedPwd = await bcrypt.hash(password, 10);
      updatedUser.password = hashedPwd;
    }
    if (widgets) {
      updatedUser.widgets = widgets;
    }
    updatedUser.save();
    return updatedUser
  }


  async deleteUser(userId: string) {
    const result = await this.userModel.deleteOne({ _id: userId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find user.');
    }
  }

  async findUser(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }

    return user;
  }

  async findAuth(username: string): Promise<User | undefined> {
    let res;
    res = await this.userModel.findOne({ email: username }).exec();  // changer username a email
    return res;
  }

}