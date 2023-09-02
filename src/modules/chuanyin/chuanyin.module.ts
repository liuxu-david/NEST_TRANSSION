import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ChuanyinService } from './chuanyin.service';

@Module({
  imports: [HttpModule],
  providers: [ChuanyinService],
})
export class ChuanyinModule {}
