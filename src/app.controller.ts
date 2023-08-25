import { Controller, Get, Logger } from '@nestjs/common';
import { Public } from './meta';

@Public()
@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  // constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    return {
      msg: 'Hello World',
    };
  }
}
