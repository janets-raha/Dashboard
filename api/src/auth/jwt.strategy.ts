import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { User } from 'src/users/user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel('User') private userModel: Model<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }


  async validate(payload: any) {
    const currentUser = await this.userModel.findOne({ email: payload.username }).exec();
    return {
      id: currentUser._id,
      name: currentUser.name,
      email: currentUser.email,
      widgets: currentUser.widgets
    };

  }

  /*   async validate(payload: any) {
      return { userId: payload.sub, username: payload.username };
    } */
}