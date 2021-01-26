import { Controller, Post, Body, Get, Param, Delete, Patch } from '@nestjs/common';
import { WidgetsService } from './widgets.service';

@Controller('widgets')
export class WidgetsController {
  constructor(private readonly widgetsService: WidgetsService) { }


  @Post()   // pour admin
  async addWidget(
    @Body('service') service: string,
    @Body('name') name: string,
    @Body('componentName') componentName: string,
    @Body('description') description: string,
    @Body('timer') timer: number,
    @Body('params') params: [],
  ) {
    const newWidget = await this.widgetsService.addWidget(
      service,
      name,
      componentName,
      description,
      timer,
      params
    );
    return { "new_widget": newWidget };
  }


  @Get()
  async getAllWidgets() {
    const widgets = await this.widgetsService.getAllWidgets();
    return widgets;
  }

  @Get("/about")
  async getAbout() {

    const about = await this.widgetsService.getAbout();
    return about;
  }

  @Get('/:id')
  getWidget(@Param('id') widgetId: string) {
    return this.widgetsService.getSingleWidget(widgetId);
  }

}
