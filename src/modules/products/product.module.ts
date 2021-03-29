import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductEntity } from './entities/product.entity';
import { AuthMiddleware } from '../users/middlewares/auth.middleware';
import { UserModule } from '../users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), UserModule],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService]
})
export class ProductModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      { path: 'products', method: RequestMethod.POST }
      // { path: 'products/*', method: RequestMethod.DELETE },
      // { path: 'products/*', method: RequestMethod.PUT },
      // { path: 'products', method: RequestMethod.GET },
      // { path: 'products', method: RequestMethod.POST },
      // { path: 'products', method: RequestMethod.PATCH }
      // uncomment these if you want to secure all routes
    );
  }
}
