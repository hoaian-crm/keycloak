import { Inject, applyDecorators } from "@nestjs/common";

export type KeycloakConfigOptions = {
  admin: {
    username: string;
    password: string;
    realName: string;
    serverUrl: string;
    clientId: string;
    clientSecret: string;
  },
  client: {
    realm: string;
    clientId: string;
    clientName: string;
  }
}

export type AvaiableScope = 'read' | 'write' | 'delete';

export const KeycloakConfigKey = Symbol("kcc");

export const InjectKeycloakConfig = () => {
  return Inject(KeycloakConfigKey)
}
