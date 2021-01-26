import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { WidgetsModule } from './widgets/widgets.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [WidgetsModule, UsersModule, MongooseModule.forRoot('mongodb://localhost/dashboard'), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }

