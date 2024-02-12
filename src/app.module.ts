import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionModule } from './modules/permissions/module';
import { KeycloakModule } from './modules/keyloak/keycloak.module';
import { AppController } from './app.controller';
import { ExampleModule } from './modules/example/example.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Database
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      port: +process.env.PG_PORT,
      autoLoadEntities: true,
      logging: process.env.NODE_ENV === 'development',
    }),
    // Keycloack Module
    KeycloakModule.register({
      admin: {
        username: 'admin',
        password: '123123123',
        realName: 'development',
        serverUrl: 'https://oauth.relationc.com',
        clientId: 'admin-cli',
        clientSecret: '46mHDSr4rkjE8M7TeBQKkRb8wCHhbUFP',
      },
      client: {
        realm: 'development',
        clientId: '948cd62b-1c9f-4b6b-afdf-86d62148217f',
        clientName: 'development'
      }
    }),
    PermissionModule,
    ExampleModule,
  ],

  // controllers: [AppController]
})
export class AppModule { }
