#### Crm Permission

##### And Nestjs base package for auto create permission in Nestjs

#### Install

```bash
# With npm
npm install crm-permission
# Width yarn
yarn add crm-permission
```

#### Usage

```ts
@AppController('Example')
export class ExampleController {
  @ApiMetaData({
    description: 'Hello world',
    name: 'Hello',
    policy: 'Example:hello',
  })
  @Get('/hello')
  async hello() {
    return 'Hello';
  }
}
```

- Note: please check the correct order of decorator
