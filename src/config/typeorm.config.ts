import { ConfigModule, ConfigService } from '@nestjs/config';

import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule.forRoot()],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'sqlite',
      // host: process.env.DATABASE_HOST,
      // port: +process.env.DATABASE_PORT,
      // username: process.env.DATABASE_USER,
      // password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: false,
      migrationsTableName: 'migrations',
      migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
    };
  },
};

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  // host: process.env.DATABASE_HOST,
  // port: +process.env.DATABASE_PORT,
  // username: process.env.DATABASE_USER,
  // password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  autoLoadEntities: true,
  synchronize: false,
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
};
