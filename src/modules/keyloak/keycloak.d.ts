import { AvaiableScope } from "./common";

export type Attributes = Record<string, string>;

export type Scope = {
  name: AvaiableScope;
  _id: string;
}

export type Resource = {
  _id: string;
  name: string;
  displayName: string;
  attributes: Attributes;
  scopes: Array<Scope>;
}

export type Permission = {
  id: string;
  name: string;
  description: string;
  type: 'scope' | 'resource',
  logic: 'POSITIVE',
  decisionStrategy: 'UNANIMOUS'
}

export type Policy = {
  type: 'role',
  logic: 'POSITIVE' | "NAGATIVE",
  decisionStrategy: "UNANIMOUS",
  name: string;
  roles?: Array<
    { id: string } // Role id to attach this policy
  > = [],
  description: string;
}
