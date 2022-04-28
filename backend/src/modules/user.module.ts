import {
  MiddlewareConsumer,
  Module,
  NestMiddleware,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VeriftCPFMiddleware } from '../middlewares/veriftcpf.middleware';
import { User } from '../users/entities/user.entity';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VeriftCPFMiddleware)
      .forRoutes({ path: '/user', method: RequestMethod.POST });
  }
}
