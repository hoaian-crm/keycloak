import { Controller, Get } from '@nestjs/common';
import { ApiMetaData, ControllerMetaData } from 'src/decorator';

@ControllerMetaData()
@Controller('example')
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
