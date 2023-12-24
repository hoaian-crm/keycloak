import { Controller, Get } from '@nestjs/common';
import { ApiMetaData, AppController, ControllerMetaData } from 'src/decorator';

@AppController('example')
export class ExampleController {
  @ApiMetaData({
    description: 'Hello world',
    name: 'Hello',
    policy: 'example:hello',
  })
  @Get('/hello')
  async hello() {
    return 'Hello';
  }
}
