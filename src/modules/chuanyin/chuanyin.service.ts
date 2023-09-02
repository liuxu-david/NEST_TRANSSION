import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WebSocket } from 'ws';
import { JSEncryptUtil, JSBASE64 } from '../../utils/handle-token';
import { staticPath } from '../../common/path.static';
import { HttpService } from '@nestjs/axios';
import { RedisService } from "../redis/redis.service";
import { EzService } from "../server/server.service";
import { MeetingStatus } from "../../common/enums";

@Injectable()
export class ChuanyinService {
  private socket: WebSocket;
  private connections: Map<string, WebSocket> = new Map();
  private readonly logger = new Logger(ChuanyinService.name);
  private readonly redisService: RedisService;
  private readonly ezService: EzService;
  @Inject(ConfigService) private readonly configService: ConfigService;
  @Inject(HttpService) private readonly httpService: HttpService;

  constructor(){
  }

  getMeetingData(roomId) {
    if(!this.connections.has(roomId)){
      this.handleConnect(roomId);
    }
    return {
      id:123,
      username:"gagagag"
    };
  }

  handleConnect(roomCode) {
    this.socket = new WebSocket(`${staticPath.chuanyin.meetingList}${roomCode}`);
    this.connections.set(roomCode, this.socket);
    this.socket.on('error', e => {
      this.connections.delete(roomCode);
      console.error(e);
    })

    this.socket.on('open', () => {
      console.log("连接成功");
      this.sendHeartbeat(roomCode);
    });

    this.socket.on('message', (e) => {
      const meetingData = JSON.parse(e.toString('utf-8'))
      const meetingInfo = JSON.parse(meetingData.data);
      console.log(roomCode,'接收到信息',meetingInfo);
      if(meetingData.code === '200') {
        // 对数据进行保存
        // 1. 存储
        // const key = meetingInfo[0]["meetingRoomId"]
        // const value = meetingInfo.map(meeting => (meeting["meetingStatus"] === "00" || meeting["meetingStatus"] === "01") )
        // this.redisService.set(key, JSON.stringify(value))
        // 2. 分发
        // const previousMeetings = []; // 上一场会议
        // const currentMeetings = []; // 当前会议
        // const nextMeetings = []; // 下一场会议
        //
        // const currentTime = new Date().getTime(); // 当前时间的时间戳，单位是毫秒
        //
        // meetingInfo.forEach(meeting => {
        //   const startTime = new Date(meeting.startTime).getTime(); // 会议开始时间的时间戳
        //   const endTime = new Date(meeting.endTime).getTime(); // 会议结束时间的时间戳
        //   const meetingDoc = {
        //     mid: meeting.meetingId,
        //     subject: meeting.meetingName,
        //     roomName: meeting.meetingRoomName,
        //     status: MeetingStatus[meeting.meetingStatus],
        //     startTime: startTime,
        //     endTime: endTime,
        //     reservedBy: {
        //       name: meeting.creatorName,
        //     },
        //     teleconference: {
        //       number: meeting.meetingCode,
        //     }
        //   }
        //   if (currentTime < startTime) {
        //     // 如果当前时间早于会议开始时间，说明是未开始的会议，放到 nextMeetings 数组中
        //     nextMeetings.push(meetingDoc);
        //   } else if (currentTime >= startTime && currentTime <= endTime) {
        //     // 如果当前时间在会议开始时间和结束时间之间，说明是正在进行的会议，放到 currentMeetings 数组中
        //     currentMeetings.push(meetingDoc);
        //   } else {
        //     // 如果当前时间晚于会议结束时间，说明是已结束的会议，放到 previousMeetings 数组中
        //     previousMeetings.push(meetingDoc);
        //   }
        // });
        //
        // const PubMeetingsParams = {
        //   previous: previousMeetings[0],
        //   current: currentMeetings[0],
        //   next: nextMeetings[0],
        // };
        // const pubMeetingInfo = {
        //   roomId: "1",
        //   method: "pubMeetings",
        //   params: PubMeetingsParams
        // }
        // this.ezService.pubMeetings(pubMeetingInfo)
        // console.log('接收到信息', meetingInfo);
      }else if(meetingData.code === 30003) {
        // 刷新token
        this.refreshToken();
      }
    });

    this.socket.on('close',  (e) => {
      console.log('断开了');
      this.connections.delete(roomCode);
      this.reconnect(roomCode)
    });
  }

  sendHeartbeat(roomCode) {
    const heartbeatMessage = 'heartbeat';
    this.socket = this.connections.get(roomCode);
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(heartbeatMessage);
      console.log(roomCode,'💓💓');
      setTimeout(() => {
        this.sendHeartbeat(roomCode);
      }, 10 * 1000);
    }
  }

  reconnect(roomCode) {
    setTimeout(() => {
      this.socket = new WebSocket(`${staticPath.chuanyin.meetingList}${roomCode}`);
      this.connections.set(roomCode,this.socket);
    }, 3000);
  }

  async refreshToken() {
   try {
     const [method, url] = staticPath.chuanyin.query;
     const result = await this.httpService.axiosRef.request({
       method,
       url,
     })
     if(result.data.code === '200'){
       const { publicKey, verifyKey} =result.data.data;
       const pwd = JSEncryptUtil.encrypt(publicKey,JSBASE64.decode(this.configService.get('LOGIN_PWD')));

       const [method, url] = staticPath.chuanyin.login;
       const loginData = await this.httpService.axiosRef.request({
         method,
         url,
         data:{
           username: this.configService.get("LOGIN_USERNAME"),
           pwd,
           verifyKey,
           lang: "zh",
         }
       })
       if(loginData.data && loginData.data.code === '200'){
         // 存全局便于后续在需要健全接口使用的时候放在请求头
       }
     }
   }
   catch (err) {
     console.log("refreshToken()出现错误",err);
   }
  }


}
