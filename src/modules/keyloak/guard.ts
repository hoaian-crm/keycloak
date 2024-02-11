import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { KeycloakService } from "./keycloak.service";
import { Reflector } from "@nestjs/core";
import { MustHavePermission, ResourceKey } from "./decorator";

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private keycloackService: KeycloakService, private reflector: Reflector) { }
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const accessToken = (req.headers['authorization'] || '').replace("Bearer ", "");
    if (!accessToken) return false;
    const resource = Reflect.getMetadata(ResourceKey, context.getClass());
    const permissions = this.reflector.get(MustHavePermission, context.getHandler());
    const result = await this.keycloackService.authorization(accessToken, resource.name, permissions);
    return result;
  }
}
