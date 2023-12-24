import { Get } from '@nestjs/common';
import { ApiMetaData, AppController } from 'src/decorator';

@AppController('test', 'test_upstream')
export class TestController {
  @ApiMetaData({
    description: 'Api for test',
    name: 'Test',
    policy: 'test:test',
  })
  @Get('/')
  async test() {
    return 'test';
  }
}
