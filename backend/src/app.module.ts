import { RecoveryPasswordService } from "./services/recoverypassword.service";
import { RecoveryPasswordController } from "./controllers/recoverypassword.controller";
import { RecoveryPasswordModule } from "./modules/recoverypassword.module";
import { LoginModule } from "./modules/login.module";
import { SearchCepModule } from "./modules/searchcep.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./modules/user.module";

@Module({
  imports: [
    RecoveryPasswordModule,
    LoginModule,
    SearchCepModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5433,
      username: "postgres",
      password: "docker",
      database: "postgres",
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
