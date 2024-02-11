import { UseGuards, applyDecorators } from "@nestjs/common";
import { CreatePermission } from "./dto/permission";
import { CreateResource } from "./dto/resource"
import { KeycloakModule } from "./keycloak.module";
import { PermissionGuard } from "./guard";
import { Reflector } from "@nestjs/core";

export const ResourceKey = Symbol("resource");
export const PermissionKey = Symbol("permission");

export function Resource(resource: CreateResource): ClassDecorator {
  return (target: any) => {
    const resources = Reflect.getMetadata(ResourceKey, KeycloakModule) || [];
    resources.push(resource);
    Reflect.defineMetadata(ResourceKey, resources, KeycloakModule);
    Reflect.defineMetadata(ResourceKey, resource, target);
  }
}

export const MustHavePermission = Reflector.createDecorator<Array<string>>();

export const Can = (permissions: Array<string> = []): MethodDecorator => {
  return applyDecorators(
    MustHavePermission(permissions),
    UseGuards(PermissionGuard)
  );
}
