import { Injectable, Param } from "@nestjs/common";
import { InjectKeycloakConfig, KeycloakConfigOptions } from "./common";
import axios, { Axios } from "axios";
import { CreateResource, GetResource, UpdateResource } from "./dto/resource";
import { Permission, Resource } from "./keycloak";
import { CreatePermission, GetPermission } from "./dto/permission";
import { response } from "express";
import { CreatePolicy } from "./dto/policy";

@Injectable()
export class KeycloakCore {

  private api: Axios;
  private resourceServerPath: string;

  constructor(@InjectKeycloakConfig() private config: KeycloakConfigOptions) {

    this.resourceServerPath =
      `/admin/realms/${config.client.realm}/clients/${config.client.clientId}/authz/resource-server`;

    this.api = axios.create({
      baseURL: config.admin.serverUrl,
    })
    this.api.interceptors.request.use(async (config) => {
      config.headers['Authorization'] = 'Bearer ' + (await this.authentication()).access_token;
      return config;
    })
  }

  async authentication(): Promise<{ access_token: string }> { // Keycloack admin authentication for use api
    return axios.post(this.config.admin.serverUrl + "/realms/master/protocol/openid-connect/token", {
      grant_type: 'password',
      username: this.config.admin.username,
      password: this.config.admin.password,
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: this.config.admin.clientId,
        password: this.config.admin.clientSecret
      }
    }).then(res => res.data)
      .catch(error => console.log("error: ", error));
  }

  async createResource(data: CreateResource): Promise<Resource> {
    return this.api.post(this.resourceServerPath + "/resource", data)
      .then(response => response.data);
  }

  async getResource(query: GetResource): Promise<Array<Resource>> {
    return this.api.get(this.resourceServerPath + "/resource", {
      params: query
    }).then(res => res.data)
  }

  async updateResource(data: UpdateResource): Promise<null> {
    return this.api.put(this.resourceServerPath + "/resource/" + data._id, data).then(response => response.data);
  }

  async createPermission(data: CreatePermission): Promise<Permission> {
    return this.api.post(this.resourceServerPath + "/permission/scope", data).then(response => response.data);
  }

  async getPermission(query: GetPermission) {
    return this.api.get(this.resourceServerPath + "/permission", { params: query }).then(response => response.data);
  }

  async updatePermission() { } // Handle latter

  async createPolicy(data: CreatePolicy) {
  }
  async deletePolicy() { }
}

