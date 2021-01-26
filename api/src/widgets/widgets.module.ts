import { Module } from '@nestjs/common';
import { WidgetsController } from './widgets.controller';
import { WidgetsService } from './widgets.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WidgetSchema } from './widget.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Widget', schema: WidgetSchema }]),
  ],
  controllers: [WidgetsController],
  providers: [WidgetsService]
})
export class WidgetsModule { }
