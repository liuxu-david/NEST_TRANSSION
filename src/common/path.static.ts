export const staticPath = {
  token: ["POST", "/oauth/token"],
  chuanyin: {
    query: ["GET","https://pfgatewayuat.transsion.com:9199/service-gl-meeting-backstage-manage/gl-meeting-backstage-manage/Sign/getRSAKeyPair"],
    login: ["POST", 'https://pfgatewayuat.transsion.com:9199/service-gl-meeting-backstage-manage/gl-meeting-backstage-manage/Sign/login'],
    meetingList: 'wss://hk-paas.transsion.com/gl-meeting-backstage/roomsLIst?meetRoomCode=',
  },
  rpc: ["POST", "/rpc/room/two-way"], // 房间控制
  room: ["GET", "/room"]
}