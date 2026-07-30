import { Module } from '@nestjs/common';
import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';


import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { BooksModule } from './books/books.module';;
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],

      inject: [ConfigService],

      useFactory: (
        configService: ConfigService,
      ) => ({
        type: 'postgres',

        host: configService.get<string>(
          'DB_HOST',
          'localhost',
        ),

        port: configService.get<number>(
          'DB_PORT',
          5432,
        ),

        username: configService.get<string>(
          'DB_USERNAME',
          'postgres',
        ),

        password: configService.get<string>(
          'DB_PASSWORD',
          '',
        ),

        database: configService.get<string>(
          'DB_NAME',
          'shelfsphere',
        ),

        autoLoadEntities: true,

        synchronize: true,
      }),
    }),

    UsersModule,

    CategoriesModule,

    BooksModule,

   
    AuthModule,

   
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}