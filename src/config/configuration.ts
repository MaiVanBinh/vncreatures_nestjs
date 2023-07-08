import { JwtModuleOptions } from '@nestjs/jwt';
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
    logging: process.env.DB_LOGGING === 'true',
    entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
    synchronize: false,
    options: dbOptions,
    migrations: [`${__dirname}/../../db/migrations/*{.ts,.js}`],
    cli: { migrationsDir: 'db/migrations' },
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'vncreatures',

    /**
     * If true, PoolCluster will attempt to reconnect when connection fails. (Default: true)
     */
    canRetry: true,

    /**
     * If connection fails, node's errorCount increases.
     * When errorCount is greater than removeNodeErrorCount, remove a node in the PoolCluster. (Default: 5)
     */
    removeNodeErrorCount: 5,

    /**
     * If connection fails, specifies the number of milliseconds before another connection attempt will be made.
     * If set to 0, then node will be removed instead and never re-used. (Default: 0)
     */
    restoreNodeTimeout: 0,

    /**
     * Determines how slaves are selected:
     * RR: Select one alternately (Round-Robin).
     * RANDOM: Select the node by random function.
     * ORDER: Select the first node available unconditionally.
     */
    selector: 'RR',
    autoLoadEntities: true,
  } as TypeOrmModuleOptions;

  const redis = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 6379,
  };

  const jwtConfig = {
    secret: process.env.JWT_CONFIG || 'jwtConfig',
    signOptions: {
      expiresIn: '10h',
    },
  } as JwtModuleOptions;

  const jwtConfigRefresh = {
    secret: process.env.JWT_CONFIG || 'jwtConfigRefresh',
    signOptions: {
      expiresIn: '10h',
    },
  } as JwtModuleOptions;

  const config = {
    port: parseInt(process.env.PORT, 10) || 3000,
    dbConfig,
    redis,
    jwtConfig,
    jwtConfigRefresh,
  };
  return config;
};
