import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'mysql',
  database: 'vncreatures',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  entities: ['dist/**/entities/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
});

export default dataSource;
