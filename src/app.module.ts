import { LoginModule } from './modules/login.module';
import { SerchCepService } from './services/serchcep.service';
import { SearchCepController } from './controllers/searchcep.controller';
import { SearchCepModule } from './modules/searchcep.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    LoginModule,
    SearchCepModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'docker',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
