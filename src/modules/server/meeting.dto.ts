
interface MeetingInfo {
  mid: string;
  subject: string;
  roomName: string;
  status: "END" | "MEETING" | "NOTSTART"; // 会议状态
  startTime: number; // 时间戳
  endTime: number; // 时间戳
  reservedBy: {
    name: string;
    tel: string;
  };
  teleconference?: { // 视频会议
    number: string;
    password?: string;
    manufacturer: string;
  };
  terminalConference?: { // 本地终端会议
    number: string;
    password: string;
    manufacturer: string;
  };
}

// meetings 具体结构
interface MeetingsData {
  previous?: MeetingInfo | null; // 上一场会议
  current?: MeetingInfo | null; // 当前会议
  next?: MeetingInfo | null; // 下一场会议
}

interface PubMeetingsParams {
  generalRoomId: string;
  meetings: MeetingsData;
}

// 下发会议信息至分控整体结构
export interface PubMeetingsMessage {
  roomId: string; // 集控会议室 id
  method: string | "pubMeetings";
  params: PubMeetingsParams;
}

export interface Meeting {
  attendance: number;
  creationTime: string;
  creator: string;
  creatorName: string;
  creatorNickName: string;
  endTime: string;
  externalMeetingFlag?: boolean;
  isCycle: string;
  meetRoomCode: string;
  meetingCode: string;
  meetingId: string;
  meetingName: string;
  meetingRoomArea: string;
  meetingRoomDetailArea: string;
  meetingRoomId: string;
  meetingRoomName: string;
  meetingStatus: string;
  meetingTarget: string;
  nowTime: string;
  robEndTime: string;
  robStartTime: string;
  startTime: string;
  vcUrl?: string;
}