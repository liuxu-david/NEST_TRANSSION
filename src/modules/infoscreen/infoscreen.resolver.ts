import { Resolver, Query, Args } from "@nestjs/graphql";
import { MeetingFilter, MeetingResults, ChuanyinDto } from "./infoscreen.dto";
import { ChuanyinService } from "../chuanyin/chuanyin.service";
import { Inject } from "@nestjs/common";
import { RedisService } from "../redis/redis.service";

@Resolver()
export class InfoscreenResolver {
  @Inject(ChuanyinService) private readonly chuanyinService: ChuanyinService;
  private readonly redisService: RedisService

  @Query(() => MeetingResults)
  async searchMeeting(
    @Args('userId') userId: string,
    @Args('token') token: string,
    @Args('queryFilter') queryFilter: MeetingFilter,
  ) {
    // 在这里执行查询逻辑，返回符合接口文档定义的数据结构
    // 例如：根据传入的参数查询会议数据，并按接口文档格式返回
    // const res = 'roomid'
    // let str = await this.redisService.get(res)
    // str = JSON.parse(str)
    // const data = {
    //   code: '122',
    //   meetingEdges: str
    // }
    // return data
  }

  @Query(()=>ChuanyinDto)
  fetchMeetingData(@Args('token')token: string) {
    const info ="会议室1"
    const value = `U1otWUtKRFMtMC0xNUYtQ1lEUzI0RlZJUEhZUw==`
    return this.chuanyinService.getMeetingData(value);
  }

  @Query(()=>ChuanyinDto)
  searchRoom(@Args('token') token: string) {
    const info ="会议室2"
    const value = `U1otWUtKRFMtMC0xNUYtWUtKVEVTVA==`
    return this.chuanyinService.getMeetingData(value);
  }
}