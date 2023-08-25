import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './modules/products/products.module';
import { dataSourceConfig } from '../config/data-source';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CurrentUserModule } from './modules/current-user/current-user.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from '../config/app.config';

@Module({
  controllers: [AppController],
  imports: [
    TypeOrmModule.forRoot(dataSourceConfig),
    AuthModule,
    UsersModule,
    CurrentUserModule,
    ProductsModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      load: [appConfig],
    }),
  ],
})
export class AppModule {}
