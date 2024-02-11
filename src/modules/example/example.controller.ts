import { Controller, Get } from '@nestjs/common';
import { Can, Resource } from '../keyloak/decorator';

@Controller('example')
@Resource({
  name: 'example',
  displayName: 'Example Resource',
  resource_scopes: ['read', 'write', 'delete'],
})
export class ExampleController {

  @Can(['read', 'update'])
  @Get('/hello')
  async hello() {
    return 'Hello';
  }
}
