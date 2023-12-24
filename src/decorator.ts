import { METHOD_METADATA, PATH_METADATA } from '@nestjs/common/constants';
import { join } from 'path';
import 'reflect-metadata';
import { AppDataSource, upsertPermission } from './datasource';

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
  return function (
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

export const ControllerMetaData = () => {
  return function (target: any) {
    Object.keys(MetaScope).map((method) => {
      (MetaScope[method].route = join(
        Reflect.getMetadata(PATH_METADATA, target) || '',
        MetaScope[method].route || '',
      )),
        (MetaScope[method].upstream = Reflect.getMetadata(
          PATH_METADATA,
          target,
        ));

      upsertPermission(MetaScope[method]).then(() => delete MetaScope[method]);
    });
  };
};
