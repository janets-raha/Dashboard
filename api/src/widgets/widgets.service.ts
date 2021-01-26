import { Injectable, NotFoundException } from '@nestjs/common';
import { Widget } from './widget.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class WidgetsService {
  constructor(
    @InjectModel('Widget') private readonly widgetModel: Model<Widget>,
  ) { }

  async addWidget(service: string, name: string, componentName: string, description: string, timer: number, params: []) {
    const newWidget = new this.widgetModel({
      service,
      name,
      componentName,
      description,
      timer,
      params
    });
    const res = await newWidget.save();
    return res;
  }



  async getAbout() {


    const about = {
      "customer": {
        host: "192.168.1.25"
      },
      "server": {
        "current_time": Date.now(),
        "services": []
      }
    }

    const wids = await this.getWidgetsSortByServices();

    let cursvc = "";
    let prevsvc = "";
    let svcs = [];
    let temp = [];
    wids.forEach(wid => {
      cursvc = wid.service;
      if (cursvc !== prevsvc) {
        if (prevsvc !== "") {
          svcs.push({ "name": prevsvc, "widgets": temp });
          temp = [];
        }
        prevsvc = cursvc;
      }
      temp.push({ name: wid.name, description: wid.description, params: wid.params });

    });
    svcs.push({ "name": prevsvc, "widgets": temp });
    about.server.services = svcs;

    return about;
  }

  async getAllWidgets() {
    const widgets = await this.widgetModel.find().exec();
    return widgets.map(widget => ({
      id: widget.id,
      service: widget.service,
      name: widget.name,
      componentName: widget.componentName,
      description: widget.description,
      timer: widget.timer,
      params: widget.params,
    }));
  }



  async getWidgetsSortByServices() {
    const widgets = await this.widgetModel.find().sort("service").exec();
    return widgets.map(widget => ({
      service: widget.service,
      name: widget.name,
      description: widget.description,
      params: widget.params,
    }));
  }

  async getSingleWidget(widgetId: string) {
    const widget = await this.findWidget(widgetId);
    return {
      id: widget.id,
      name: widget.name,
      description: widget.description,
      timer: widget.timer,
      params: widget.params,
    };
  }
  /* 
    async updateWidget(
      widgetId: string,
      name: string,
      genre: string,
      picture: string,
    ) {
      const updatedWidget = await this.findWidget(widgetId);
  
      if (name) {
        updatedWidget.name = name;
      }
      if (genre) {
        updatedWidget.genre = genre;
      }
      if (picture) {
        updatedWidget.picture = picture;
      }
      updatedWidget.save();
    }
  
    async deleteWidget(widgetId: string) {
      const res = await this.widgetModel.deleteOne({ _id: widgetId }).exec();
      if (res.n === 0) {
        throw new NotFoundException('Could not find widget.');
      }
    }
   */

  private async findWidget(id: string): Promise<Widget> {
    let widget;
    try {
      widget = await this.widgetModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find widget.');
    }
    if (!widget) {
      throw new NotFoundException('Could not find widget.');
    }
    return widget;
  }

}
