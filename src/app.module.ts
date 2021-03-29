import { ProductModule } from './modules/products/product.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
// MODULES

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    CacheModule.register(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      entities: [join(__dirname, '**/entities/**.entity{.ts,.js}')],
      synchronize: true,
      logger: 'advanced-console',
      useUnifiedTopology: true
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAILER_HOST,
        port: process.env.MAILER_PORT,
        secure: true, // use SSL true or false
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_API_KEY
        }
      },
      template: {
        dir: join(__dirname, '..', 'templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter if you're using .pug files
        options: {
          strict: true
        }
      }
    }),
    ProductModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor
    },
    AppService
  ]
})
export class AppModule {}
