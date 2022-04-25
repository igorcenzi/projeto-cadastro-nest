import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import { SearchCepController } from 'src/controllers/searchcep.controller';
import { SerchCepService } from 'src/services/serchcep.service';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      store: redisStore,
      socket: {
        host: 'localhost',
        port: 6379,
      },
      ttl: 60 * 3600 * 1000,
    }),
  ],
  controllers: [SearchCepController],
  providers: [SerchCepService],
})
export class SearchCepModule {}
