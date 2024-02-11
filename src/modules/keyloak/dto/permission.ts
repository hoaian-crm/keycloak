import { AvaiableScope } from "../common";

export class CreatePermission {
  name: string;
  scopes?: Array<AvaiableScope> = [];
  type: 'scope' | 'resource';
  description: string;
  resources: Array<string>;// Resource Id
}

export class GetPermission {
  name: string;
}
