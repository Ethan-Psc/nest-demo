import { DataSource } from 'typeorm';
import { Coffee } from 'src/coffee/entities/coffee.entity';
import { Flavor } from 'src/coffee/entities/flavor.entity';
export default new DataSource({
  type: 'postgres',
  name: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: '123456',
  database: 'postgres',
  logging: ['query', 'error'],
  entities: [Coffee, Flavor],
  migrations: [process.cwd() + '/src/migrations/*.ts'],
  synchronize: false,
});
