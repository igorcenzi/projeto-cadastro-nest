/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecoveryPasswordController } from '../controllers/recoverypassword.controller';
import { User } from '../users/entities/user.entity';
import { RecoveryPasswordService } from '../services/recoverypassword.service';

@Module({
    imports: [TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'VERY_SECRET_WORD',
      signOptions: { expiresIn: '24h' },
    }),],
    controllers: [RecoveryPasswordController],
    providers: [RecoveryPasswordService],
})
export class RecoveryPasswordModule {}
