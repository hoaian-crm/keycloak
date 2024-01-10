import { METHOD_METADATA, PATH_METADATA } from '@nestjs/common/constants';
import { join } from 'path';
import 'reflect-metadata';
import { AppDataSource, upsertPermission } from './datasource';
import { Controller, applyDecorators } from '@nestjs/common';

enum METHOD_TYPE {
  GET,
  POST,
  PUT,
  DELETE,
  PATCH,
  OPTION,
  HEAD,
}

export class ApiMetaDataProp {
  id?: string;
  name: string;
  description: string;
  policy: string;
  route?: string;
  method?: string;
  upstream?: string;
}

export const MetaScope: {
  [key: string]: ApiMetaDataProp;
} = {};

export const ApiMetaData = (prop: ApiMetaDataProp) => {
  return function(
    target: object,
    field: string,
    descriptor: PropertyDescriptor,
  ) {
    MetaScope[field] = {
      ...prop,
      method:
        METHOD_TYPE[Reflect.getMetadata(METHOD_METADATA, descriptor.value)],
      route: Reflect.getMetadata(PATH_METADATA, descriptor.value),
    };
  };
};

export const ControllerMetaData = (route: string, upstream?: string) => {
  upstream = upstream || route;
  return function(target: any) {
    Object.keys(MetaScope).map((method) => {
      (MetaScope[method].route = join(
        '/',
        Reflect.getMetadata(PATH_METADATA, target) || '',
        MetaScope[method].route || '',
      )),
        (MetaScope[method].upstream = upstream);
      const p = MetaScope[method];
      delete MetaScope[method];
      upsertPermission(p);
    });
  };
};

export const AppController = (route: string, upstream?: string) => {
  return applyDecorators(
    Controller(route),
    ControllerMetaData(upstream || route),
  );
};
