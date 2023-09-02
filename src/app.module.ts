import { Module } from '@nestjs/common';
import { ChuanyinModule } from './modules/chuanyin/chuanyin.module';
import { TasksModule } from './modules/tasks/tasks.module';
import devConfig from "./config/dev.config"
import prodConfig from  "./config/prod.config"
import {isDev} from  "./utils/judge-env"
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { EzModule } from './modules/server/server.module';
import { RedisModule } from './modules/redis/redis.module';
import { InfoscreenModule } from "./modules/infoscreen/infoscreen.module";

@Module({
  imports: [
    ...setupModules(),
    TasksModule,
    ChuanyinModule,
    EzModule,
    RedisModule,
    InfoscreenModule
  ],
})
export class AppModule {}

function setupModules() {
  const _configModule = ConfigModule.forRoot({
    isGlobal: true,
    load: [isDev() ? devConfig : prodConfig]
  });

  const _scheduleModdle = ScheduleModule.forRoot();

  return [_configModule, _scheduleModdle]
}