import { Global, Module } from "@nestjs/common";
import { Redis } from "ioredis";
import { RedisService } from './redis.service';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS',
      useValue: new Redis(
        {
          host: '127.0.0.1',
          port: 6379
        }
      ),
    },
    RedisService,
  ],
  exports: ['REDIS'],
})
export class RedisModule {}
