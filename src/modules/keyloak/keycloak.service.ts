import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { KeycloakCore } from "./keycloak.core";
import { CreateResource } from "./dto/resource";
import { KeycloakConfigKey, KeycloakConfigOptions } from "./common";
import { ResourceKey } from "./decorator";
import { KeycloakModule } from "./keycloak.module";
import { Resource } from "./keycloak";
import axios from "axios";

@Injectable()
export class KeycloakService implements OnModuleInit {

  constructor(private core: KeycloakCore, @Inject(KeycloakConfigKey) private config: KeycloakConfigOptions) { }

  async onModuleInit() {
    try {
      const resources: Array<CreateResource> = Reflect.getMetadata(ResourceKey, KeycloakModule) || [];
      await Promise.all(
        resources.map(async (resource) => {
          const result = await this.upsertResource(resource);
          await this.createScopePermission(result);
        })
      )
    } catch (error) {

    }
  }

  async upsertResource(data: CreateResource) {
    let [resource] = await this.core.getResource({ name: data.name });
    if (!resource) {
      return await this.core.createResource(data);
    }
    await this.core.updateResource({ ...data, _id: resource._id });
    [resource] = await this.core.getResource({ name: data.name });
    return resource;
  }

  async createScopePermission(resource: Resource) {
    return Promise.all(
      resource.scopes.map(async (scope) => {
        return await this.core.createPermission({
          name: `${resource.name}:${scope.name}`,
          type: "scope",
          description: `Allow ${scope.name} ${resource.name}`,
          resources: [resource._id],
          scopes: [scope.name]
        })
      })
    )
  }

  async authorization(accessToken: string, resourceName: string, permission: Array<string>): Promise<boolean> {
    return axios.post(
      `${this.config.admin.serverUrl}/realms/${this.config.client.realm}/protocol/openid-connect/token`,
      {
        grant_type: "urn:ietf:params:oauth:grant-type:uma-ticket",
        audience: this.config.client.clientName,
        permission,
        response_mode: 'permissions'
      },
      {
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    ).then(response => {
      if (!response.data) return false;
      const resource = response.data.find((resource: any) => resource.rsname === resourceName);
      let result = true;
      permission.forEach(p => {
        result = result && resource.scopes.includes(p);
      })
      return result
    }).catch(() => false) // Return false if have any error
  }
}
