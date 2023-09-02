import { ObjectType, Field, InputType } from "@nestjs/graphql";

@InputType()
class QueryFilterInput {
  @Field()
  date: number;
}

@InputType()
export class MeetingFilter {
  @Field()
  userId: string;

  @Field()
  token: string;

  @Field(() => QueryFilterInput)
  queryFilter: QueryFilterInput;
}

@ObjectType()
export class User {
  @Field({ description: "用户id", nullable: true })
  userId?: string;

  @Field({ description: "用户名称", nullable: true })
  name: string;

  @Field({ description: "手机号", nullable: true })
  tel?: string;

  @Field({ description: "工号", nullable: true })
  employeeNumber?: string;

  @Field({ description: "部门", nullable: true })
  departments?: string;

  @Field({ description: "邮箱", nullable: true })
  email?: string;

  @Field({ description: "所属公司", nullable: true })
  company?: string;

  @Field({ description: "公司的职位", nullable: true })
  position?: string;

  @Field({ description: "header颜色", nullable: true })
  headerColor?: string;

  @Field({ description: "部门名称", nullable: true })
  deptNames?: string;
}

@ObjectType()
class DemandDetail {
  @Field()
  type?: string;

  @Field()
  amount?: number
}

@ObjectType()
class Service {
  @Field(() => DemandDetail)
  quickDemands: DemandDetail;

  @Field({ description: "具体内容", nullable: true })
  specificContent?: string;
}

@ObjectType()
class OperationInfo {
  @Field({ nullable: true })
  date: number;

  // operator 字段的定义。
  @Field(() => User, { nullable: true })
  operator: User;

  @Field({ nullable: true })
  reason: string;
}

@ObjectType()
class OutsideParticipant {
  @Field({ description: "名称", nullable: true })
  name!: string;

  @Field({ description: "手机号", nullable: true })
  tel!: string;

  @Field({ description: "邮箱", nullable: true })
  email?: string;

  @Field({ description: "所属公司", nullable: true })
  company?: string;

  @Field({ description: "公司的职位", nullable: true })
  position?: string;

  @Field({ description: "header颜色", nullable: true })
  headerColor?: string;

  @Field({ description: "车牌号 for 外部", nullable: true })
  licensePlateNumber?: string;

  @Field({ description: "是否需要邮件、短信等通知", nullable: true })
  needNotification?: boolean;
}

@ObjectType()
class FinishedInfo {
  @Field()
  date: number
}

@ObjectType()
export class Meeting {
  @Field({ description: "header颜色", nullable: true })
  headerColor?: string;

  @Field({ description: "会议主题", nullable: true })
  subject?: string;

  @Field({ description: "短链接", nullable: true })
  shortLink?: string;

  @Field({ description: "开始时间", nullable: true })
  startTime: string;

  @Field({ description: "结束时间", nullable: true })
  endTime: string;

  @Field({ description: "会议的状态", nullable: true })
  status: string;

  @Field({ nullable: true })
  type?: string;

  @Field({ description: "设备要求", nullable: true })
  deviceRequire?: string;

  @Field({ description: "参会人数", nullable: true })
  numberOfPeople?: number;

  @Field({ description: "应到人数", nullable: true })
  shouldAttendance?: number;

  @Field({ description: "实到人数", nullable: true })
  actualAttendance?: number;

  // service 字段的定义。
  @Field(() => Service)
  service: Service;

  // checkinInfo 字段的定义。
  @Field(() => OperationInfo, { nullable: true })
  checkinInfo: OperationInfo;

  // insideParticipant 字段的定义。
  @Field(() => User, { nullable: true })
  insideParticipant?: User;

  // outsideParticipant 字段的定义。
  @Field(() => OutsideParticipant, { nullable: true })
  outsideParticipant?: OutsideParticipant;

  // reservedBy 字段的定义。
  @Field(() => User)
  reservedBy: User;

  // finishedInfo 字段的定义。
  @Field(() => OperationInfo)
  finishedInfo?: OperationInfo;
}

@ObjectType()
class MeetingEdge {
  // 定义 MeetingEdge 类型的字段。
  @Field()
  meeting: Meeting

  @Field()
  cursor?: string
}

@ObjectType()
export class MeetingResults {
  @Field()
  code: string;

  @Field()
  errMsg?: string;

  @Field(() => [MeetingEdge])
  meetingEdges: MeetingEdge[];
}

@ObjectType()
export class ChuanyinDto{
  @Field()
  id: number;

  @Field()
  username: string;
}
