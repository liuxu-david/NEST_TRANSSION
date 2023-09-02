import { Controller, Get, Query } from "@nestjs/common";
import { EzService } from "./server.service";


@Controller('room')
export class ServerController {

  constructor(
    private readonly ezService: EzService
  ) {
  }
  @Get()
  async getDemo(@Query("applicense") applicense){
    await this.ezService.getRoomInfo(applicense)
  }
}