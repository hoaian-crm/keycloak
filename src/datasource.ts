import { DataSource } from 'typeorm';
import { ApiMetaDataProp } from './decorator';
import { config } from 'dotenv';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PG_HOST,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: +process.env.PG_PORT,
});

export const upsertPermission = async (data: ApiMetaDataProp) => {
  return AppDataSource.initialize()
    .then(() =>
      AppDataSource.query(
        `select id from permissions where policy = '${data.policy}'`,
      ),
    )
    .then((p) => {
      if (p.length > 0) data.id = p[0].id;
    })
    .then(() =>
      AppDataSource.query(`
    insert into permissions (id, name, description, policy, resource, upstream, method, "createdAt", "updatedAt", "deletedAt")
    values (
        ${data.id ? data.id : 'default'},
        '${data.name}',
        '${data.description}',
        '${data.policy}',
        '${data.route}',
        '${data.upstream}',
        '${data.method}',
        default,
        default,
        default
    )
    on conflict (id)
    do update set 
    name = '${data.name}',
    description = '${data.description}',
    policy = '${data.policy}',
    resource = '${data.route}',
    upstream = '${data.upstream}',
    method = '${data.method}',
    "updatedAt" = default
  `),
    )
    .then(() => AppDataSource.close())
    .catch((error) => console.log('Insert permissions error: ', error));
};
