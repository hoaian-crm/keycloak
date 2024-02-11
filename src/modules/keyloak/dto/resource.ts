import { PartialType } from "@nestjs/mapped-types";
import { AvaiableScope } from "../common";
import { Attributes, Resource } from "../keycloak";

export class CreateResource {
  name: string;
  displayName: string;
  resource_scopes: Array<AvaiableScope> = ['read', 'write', 'delete'];
  attributes?: Record<string, string> = {};
}

export class UpdateResource {
  _id: string;
  name?: string;
  displayName?: string;
  attributes?: Attributes;
  resource_scopes?: Array<AvaiableScope> = [];
}

export class GetResource {
  name: string;
}
