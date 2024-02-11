import { Module } from '@nestjs/common';
import { ExampleController } from './Example.controller';
import { TestController } from './test.controller';

@Module({
  controllers: [ExampleController, TestController],
})
export class ExampleModule {}
