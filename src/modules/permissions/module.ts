import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entity';
import { PermissionService } from './service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  exports: [PermissionService],
  providers: [PermissionService],
})
export class PermissionModule {}
