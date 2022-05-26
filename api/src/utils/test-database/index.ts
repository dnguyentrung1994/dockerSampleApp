import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmTestConfig = (): TypeOrmModuleOptions => {
  return {
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    entities: ['../**/**.entity.{ts, js}'],
    migrationsTableName: 'migration',
    migrations: ['./src/migration/*.{js,ts}'],
  };
};
