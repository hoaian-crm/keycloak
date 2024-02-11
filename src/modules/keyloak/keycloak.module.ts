import { DynamicModule, Global, Module } from "@nestjs/common";
import { KeycloakService } from './keycloak.service';
import { KeycloakCore } from "./keycloak.core";
import { KeycloakConfigKey, KeycloakConfigOptions } from "./common";



@Global()
@Module({
  providers: [KeycloakService],
  exports: [KeycloakService]
})
export class KeycloakModule {
  static register(options: KeycloakConfigOptions): DynamicModule {
    return {
      global: true,
      module: KeycloakModule,
      providers: [
        KeycloakService,
        { provide: KeycloakConfigKey, useValue: options },
        KeycloakCore,
      ],
      exports: [KeycloakService]
    }
  }
}
