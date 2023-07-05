import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default () => {
  const getDbType = () => process.env.DB_TYPE || 'mysql';

  const getDbOptions = (dbType: string) => {
    if (dbType === 'mssql') {
      return {
        cryptoCredentialsDetails: {
          minVersion: 'TLSv1',
        },
        enableArithAbort: false,
      };
    }
    return {};
  };
  const dbType = getDbType();
  const dbOptions = getDbOptions(dbType);

  const dbConfig = {
    type: dbType,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'vncreatures',
    logging: process.env.DB_LOGGING === 'true',
    entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
    synchronize: false,
    options: dbOptions,
    migrations: [`${__dirname}/../../db/migrations/*{.ts,.js}`],
    cli: { migrationsDir: 'db/migrations' },
  } as TypeOrmModuleOptions;

  const redis = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 6379,
  };

  const config = {
    port: parseInt(process.env.PORT, 10) || 3000,
    dbConfig,
    redis,
  };
  return config;
};
