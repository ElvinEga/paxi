// @generated by protoc-gen-es v1.4.1 with parameter "target=ts,import_extension=.ts"
// @generated from file plugnmeet_common_api.proto (package plugnmeet, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type {
  BinaryReadOptions,
  FieldList,
  JsonReadOptions,
  JsonValue,
  PartialMessage,
  PlainMessage,
} from '@bufbuild/protobuf';
import { Message, proto3 } from '@bufbuild/protobuf';
import { DataMsgBodyType } from './plugnmeet_datamessage_pb.ts';

/**
 * @generated from enum plugnmeet.SwitchPresenterTask
 */
export enum SwitchPresenterTask {
  /**
   * @generated from enum value: PROMOTE = 0;
   */
  PROMOTE = 0,

  /**
   * @generated from enum value: DEMOTE = 1;
   */
  DEMOTE = 1,
}
// Retrieve enum metadata with: proto3.getEnumType(SwitchPresenterTask)
proto3.util.setEnumType(SwitchPresenterTask, 'plugnmeet.SwitchPresenterTask', [
  { no: 0, name: 'PROMOTE' },
  { no: 1, name: 'DEMOTE' },
]);

/**
 * @generated from enum plugnmeet.ExternalMediaPlayerTask
 */
export enum ExternalMediaPlayerTask {
  /**
   * @generated from enum value: START_PLAYBACK = 0;
   */
  START_PLAYBACK = 0,

  /**
   * @generated from enum value: END_PLAYBACK = 1;
   */
  END_PLAYBACK = 1,
}
// Retrieve enum metadata with: proto3.getEnumType(ExternalMediaPlayerTask)
proto3.util.setEnumType(
  ExternalMediaPlayerTask,
  'plugnmeet.ExternalMediaPlayerTask',
  [
    { no: 0, name: 'START_PLAYBACK' },
    { no: 1, name: 'END_PLAYBACK' },
  ]
);

/**
 * @generated from enum plugnmeet.ExternalDisplayLinkTask
 */
export enum ExternalDisplayLinkTask {
  /**
   * @generated from enum value: START_EXTERNAL_LINK = 0;
   */
  START_EXTERNAL_LINK = 0,

  /**
   * @generated from enum value: STOP_EXTERNAL_LINK = 1;
   */
  STOP_EXTERNAL_LINK = 1,
}
// Retrieve enum metadata with: proto3.getEnumType(ExternalDisplayLinkTask)
proto3.util.setEnumType(
  ExternalDisplayLinkTask,
  'plugnmeet.ExternalDisplayLinkTask',
  [
    { no: 0, name: 'START_EXTERNAL_LINK' },
    { no: 1, name: 'STOP_EXTERNAL_LINK' },
  ]
);

/**
 * @generated from message plugnmeet.CommonResponse
 */
export class CommonResponse extends Message<CommonResponse> {
  /**
   * @generated from field: bool status = 1;
   */
  status = false;

  /**
   * @generated from field: string msg = 2;
   */
  msg = '';

  constructor(data?: PartialMessage<CommonResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = 'plugnmeet.CommonResponse';
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'status', kind: 'scalar', T: 8 /* ScalarType.BOOL */ },
    { no: 2, name: 'msg', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): CommonResponse {
    return new CommonResponse().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): CommonResponse {
    return new CommonResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): CommonResponse {
    return new CommonResponse().fromJsonString(jsonString, options);
  }

  static equals(
    a: CommonResponse | PlainMessage<CommonResponse> | undefined,
    b: CommonResponse | PlainMessage<CommonResponse> | undefined
  ): boolean {
    return proto3.util.equals(CommonResponse, a, b);
  }
}

/**
 * @generated from message plugnmeet.VerifyTokenReq
 */
export class VerifyTokenReq extends Message<VerifyTokenReq> {
  /**
   * @generated from field: optional bool is_production = 1;
   */
  isProduction?: boolean;

  constructor(data?: PartialMessage<VerifyTokenReq>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = 'plugnmeet.VerifyTokenReq';
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    {
      no: 1,
      name: 'is_production',
      kind: 'scalar',
      T: 8 /* ScalarType.BOOL */,
      opt: true,
    },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): VerifyTokenReq {
    return new VerifyTokenReq().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): VerifyTokenReq {
    return new VerifyTokenReq().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): VerifyTokenReq {
    return new VerifyTokenReq().fromJsonString(jsonString, options);
  }

  static equals(
    a: VerifyTokenReq | PlainMessage<VerifyTokenReq> | undefined,
    b: VerifyTokenReq | PlainMessage<VerifyTokenReq> | undefined
  ): boolean {
    return proto3.util.equals(VerifyTokenReq, a, b);
  }
}

/**
 * @generated from message plugnmeet.VerifyTokenRes
 */
export class VerifyTokenRes extends Message<VerifyTokenRes> {
  /**
   * @generated from field: bool status = 1;
   */
  status = false;

  /**
   * @generated from field: string msg = 2;
   */
  msg = '';

  /**
   * @generated from field: optional string livekit_host = 3;
   */
  livekitHost?: string;

  /**
   * @generated from field: optional string token = 4;
   */
  token?: string;

  /**
   * @generated from field: optional string server_version = 5;
   */
  serverVersion?: string;

  /**
   * @generated from field: bool enabled_e2ee = 6;
   */
  enabledE2ee = false;

  constructor(data?: PartialMessage<VerifyTokenRes>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = 'plugnmeet.VerifyTokenRes';
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'status', kind: 'scalar', T: 8 /* ScalarType.BOOL */ },
    { no: 2, name: 'msg', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    {
      no: 3,
      name: 'livekit_host',
      kind: 'scalar',
      T: 9 /* ScalarType.STRING */,
      opt: true,
    },
    {
      no: 4,
      name: 'token',
      kind: 'scalar',
      T: 9 /* ScalarType.STRING */,
      opt: true,
    },
    {
      no: 5,
      name: 'server_version',
      kind: 'scalar',
      T: 9 /* ScalarType.STRING */,
      opt: true,
    },
    { no: 6, name: 'enabled_e2ee', kind: 'scalar', T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): VerifyTokenRes {
    return new VerifyTokenRes().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): VerifyTokenRes {
    return new VerifyTokenRes().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): VerifyTokenRes {
    return new VerifyTokenRes().fromJsonString(jsonString, options);
  }

  static equals(
    a: VerifyTokenRes | PlainMessage<VerifyTokenRes> | undefined,
    b: VerifyTokenRes | PlainMessage<VerifyTokenRes> | undefined
  ): boolean {
    return proto3.util.equals(VerifyTokenRes, a, b);
  }
}

/**
 * @generated from message plugnmeet.MuteUnMuteTrackReq
 */
export class MuteUnMuteTrackReq extends Message<MuteUnMuteTrackReq> {
  /**
   * @generated from field: string sid = 1;
   */
  sid = '';

  /**
   * @generated from field: string room_id = 2;
   */
  roomId = '';

  /**
   * @generated from field: string user_id = 3;
   */
  userId = '';

  /**
   * @generated from field: string track_sid = 4;
   */
  trackSid = '';

  /**
   * @generated from field: bool muted = 5;
   */
  muted = false;

  /**
   * @generated from field: string Requested_user_id = 6;
   */
  RequestedUserId = '';

  constructor(data?: PartialMessage<MuteUnMuteTrackReq>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = 'plugnmeet.MuteUnMuteTrackReq';
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'sid', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 2, name: 'room_id', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 3, name: 'user_id', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 4, name: 'track_sid', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 5, name: 'muted', kind: 'scalar', T: 8 /* ScalarType.BOOL */ },
    {
      no: 6,
      name: 'Requested_user_id',
      kind: 'scalar',
      T: 9 /* ScalarType.STRING */,
    },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): MuteUnMuteTrackReq {
    return new MuteUnMuteTrackReq().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): MuteUnMuteTrackReq {
    return new MuteUnMuteTrackReq().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): MuteUnMuteTrackReq {
    return new MuteUnMuteTrackReq().fromJsonString(jsonString, options);
  }

  static equals(
    a: MuteUnMuteTrackReq | PlainMessage<MuteUnMuteTrackReq> | undefined,
    b: MuteUnMuteTrackReq | PlainMessage<MuteUnMuteTrackReq> | undefined
  ): boolean {
    return proto3.util.equals(MuteUnMuteTrackReq, a, b);
  }
}

/**
 * @generated from message plugnmeet.RemoveParticipantReq
 */
export class RemoveParticipantReq extends Message<RemoveParticipantReq> {
  /**
   * @generated from field: string sid = 1;
   */
  sid = '';

  /**
   * @generated from field: string room_id = 2;
   */
  roomId = '';

  /**
   * @generated from field: string user_id = 3;
   */
  userId = '';

  /**
   * @generated from field: string msg = 4;
   */
  msg = '';

  /**
   * @generated from field: bool block_user = 5;
   */
  blockUser = false;

  constructor(data?: PartialMessage<RemoveParticipantReq>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = 'plugnmeet.RemoveParticipantReq';
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'sid', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 2, name: 'room_id', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 3, name: 'user_id', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 4, name: 'msg', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 5, name: 'block_user', kind: 'scalar', T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): RemoveParticipantReq {
    return new RemoveParticipantReq().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): RemoveParticipantReq {
    return new RemoveParticipantReq().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): RemoveParticipantReq {
    return new RemoveParticipantReq().fromJsonString(jsonString, options);
  }

  static equals(
    a: RemoveParticipantReq | PlainMessage<RemoveParticipantReq> | undefined,
    b: RemoveParticipantReq | PlainMessage<RemoveParticipantReq> | undefined
  ): boolean {
    return proto3.util.equals(RemoveParticipantReq, a, b);
  }
}

/**
 * @generated from message plugnmeet.DataMessageReq
 */
export class DataMessageReq extends Message<DataMessageReq> {
  /**
   * @generated from field: string room_id = 1;
   */
  roomId = '';

  /**
   * @generated from field: string room_sid = 2;
   */
  roomSid = '';

  /**
   * @generated from field: string user_id = 3;
   */
  userId = '';

  /**
   * @generated from field: string user_sid = 4;
   */
  userSid = '';

  /**
   * @generated from field: plugnmeet.DataMsgBodyType msg_body_type = 5;
   */
  msgBodyType = DataMsgBodyType.RAISE_HAND;

  /**
   * @generated from field: string msg = 6;
   */
  msg = '';

  /**
   * @generated from field: string Requested_user_id = 7;
   */
  RequestedUserId = '';

  /**
   * @generated from field: repeated string send_to = 8;
   */
  sendTo: string[] = [];

  /**
   * @generated from field: bool is_admin = 9;
   */
  isAdmin = false;

  constructor(data?: PartialMessage<DataMessageReq>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = 'plugnmeet.DataMessageReq';
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'room_id', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 2, name: 'room_sid', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 3, name: 'user_id', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 4, name: 'user_sid', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    {
      no: 5,
      name: 'msg_body_type',
      kind: 'enum',
      T: proto3.getEnumType(DataMsgBodyType),
    },
    { no: 6, name: 'msg', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    {
      no: 7,
      name: 'Requested_user_id',
      kind: 'scalar',
      T: 9 /* ScalarType.STRING */,
    },
    {
      no: 8,
      name: 'send_to',
      kind: 'scalar',
      T: 9 /* ScalarType.STRING */,
      repeated: true,
    },
    { no: 9, name: 'is_admin', kind: 'scalar', T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): DataMessageReq {
    return new DataMessageReq().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): DataMessageReq {
    return new DataMessageReq().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): DataMessageReq {
    return new DataMessageReq().fromJsonString(jsonString, options);
  }

  static equals(
    a: DataMessageReq | PlainMessage<DataMessageReq> | undefined,
    b: DataMessageReq | PlainMessage<DataMessageReq> | undefined
  ): boolean {
    return proto3.util.equals(DataMessageReq, a, b);
  }
}

/**
 * @generated from message plugnmeet.RoomEndAPIReq
 */
export class RoomEndAPIReq extends Message<RoomEndAPIReq> {
  /**
   * @generated from field: string room_id = 1;
   */
  roomId = '';

  constructor(data?: PartialMessage<RoomEndAPIReq>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = 'plugnmeet.RoomEndAPIReq';
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'room_id', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): RoomEndAPIReq {
    return new RoomEndAPIReq().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): RoomEndAPIReq {
    return new RoomEndAPIReq().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): RoomEndAPIReq {
    return new RoomEndAPIReq().fromJsonString(jsonString, options);
  }

  static equals(
    a: RoomEndAPIReq | PlainMessage<RoomEndAPIReq> | undefined,
    b: RoomEndAPIReq | PlainMessage<RoomEndAPIReq> | undefined
  ): boolean {
    return proto3.util.equals(RoomEndAPIReq, a, b);
  }
}

/**
 * @generated from message plugnmeet.ChangeVisibilityRes
 */
export class ChangeVisibilityRes extends Message<ChangeVisibilityRes> {
  /**
   * @generated from field: string room_id = 1;
   */
  roomId = '';

  /**
   * @generated from field: optional bool visible_notepad = 2;
   */
  visibleNotepad?: boolean;

  /**
   * @generated from field: optional bool visible_white_board = 3;
   */
  visibleWhiteBoard?: boolean;

  constructor(data?: PartialMessage<ChangeVisibilityRes>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = 'plugnmeet.ChangeVisibilityRes';
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'room_id', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    {
      no: 2,
      name: 'visible_notepad',
      kind: 'scalar',
      T: 8 /* ScalarType.BOOL */,
      opt: true,
    },
    {
      no: 3,
      name: 'visible_white_board',
      kind: 'scalar',
      T: 8 /* ScalarType.BOOL */,
      opt: true,
    },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): ChangeVisibilityRes {
    return new ChangeVisibilityRes().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): ChangeVisibilityRes {
    return new ChangeVisibilityRes().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): ChangeVisibilityRes {
    return new ChangeVisibilityRes().fromJsonString(jsonString, options);
  }

  static equals(
    a: ChangeVisibilityRes | PlainMessage<ChangeVisibilityRes> | undefined,
    b: ChangeVisibilityRes | PlainMessage<ChangeVisibilityRes> | undefined
  ): boolean {
    return proto3.util.equals(ChangeVisibilityRes, a, b);
  }
}

/**
 * @generated from message plugnmeet.SwitchPresenterReq
 */
export class SwitchPresenterReq extends Message<SwitchPresenterReq> {
  /**
   * @generated from field: plugnmeet.SwitchPresenterTask task = 1;
   */
  task = SwitchPresenterTask.PROMOTE;

  /**
   * @generated from field: string user_id = 2;
   */
  userId = '';

  /**
   * @generated from field: string room_id = 3;
   */
  roomId = '';

  /**
   * @generated from field: string Requested_user_id = 4;
   */
  RequestedUserId = '';

  constructor(data?: PartialMessage<SwitchPresenterReq>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = 'plugnmeet.SwitchPresenterReq';
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    {
      no: 1,
      name: 'task',
      kind: 'enum',
      T: proto3.getEnumType(SwitchPresenterTask),
    },
    { no: 2, name: 'user_id', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 3, name: 'room_id', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    {
      no: 4,
      name: 'Requested_user_id',
      kind: 'scalar',
      T: 9 /* ScalarType.STRING */,
    },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): SwitchPresenterReq {
    return new SwitchPresenterReq().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): SwitchPresenterReq {
    return new SwitchPresenterReq().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): SwitchPresenterReq {
    return new SwitchPresenterReq().fromJsonString(jsonString, options);
  }

  static equals(
    a: SwitchPresenterReq | PlainMessage<SwitchPresenterReq> | undefined,
    b: SwitchPresenterReq | PlainMessage<SwitchPresenterReq> | undefined
  ): boolean {
    return proto3.util.equals(SwitchPresenterReq, a, b);
  }
}

/**
 * @generated from message plugnmeet.ExternalMediaPlayerReq
 */
export class ExternalMediaPlayerReq extends Message<ExternalMediaPlayerReq> {
  /**
   * @generated from field: plugnmeet.ExternalMediaPlayerTask task = 1;
   */
  task = ExternalMediaPlayerTask.START_PLAYBACK;

  /**
   * @generated from field: optional string url = 2;
   */
  url?: string;

  /**
   * @generated from field: optional double seek_to = 3;
   */
  seekTo?: number;

  /**
   * @generated from field: string room_id = 4;
   */
  roomId = '';

  /**
   * @generated from field: string user_id = 5;
   */
  userId = '';

  constructor(data?: PartialMessage<ExternalMediaPlayerReq>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = 'plugnmeet.ExternalMediaPlayerReq';
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    {
      no: 1,
      name: 'task',
      kind: 'enum',
      T: proto3.getEnumType(ExternalMediaPlayerTask),
    },
    {
      no: 2,
      name: 'url',
      kind: 'scalar',
      T: 9 /* ScalarType.STRING */,
      opt: true,
    },
    {
      no: 3,
      name: 'seek_to',
      kind: 'scalar',
      T: 1 /* ScalarType.DOUBLE */,
      opt: true,
    },
    { no: 4, name: 'room_id', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 5, name: 'user_id', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): ExternalMediaPlayerReq {
    return new ExternalMediaPlayerReq().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): ExternalMediaPlayerReq {
    return new ExternalMediaPlayerReq().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): ExternalMediaPlayerReq {
    return new ExternalMediaPlayerReq().fromJsonString(jsonString, options);
  }

  static equals(
    a:
      | ExternalMediaPlayerReq
      | PlainMessage<ExternalMediaPlayerReq>
      | undefined,
    b: ExternalMediaPlayerReq | PlainMessage<ExternalMediaPlayerReq> | undefined
  ): boolean {
    return proto3.util.equals(ExternalMediaPlayerReq, a, b);
  }
}

/**
 * @generated from message plugnmeet.ExternalDisplayLinkReq
 */
export class ExternalDisplayLinkReq extends Message<ExternalDisplayLinkReq> {
  /**
   * @generated from field: plugnmeet.ExternalDisplayLinkTask task = 1;
   */
  task = ExternalDisplayLinkTask.START_EXTERNAL_LINK;

  /**
   * @generated from field: optional string url = 2;
   */
  url?: string;

  /**
   * @generated from field: string room_id = 4;
   */
  roomId = '';

  /**
   * @generated from field: string user_id = 5;
   */
  userId = '';

  constructor(data?: PartialMessage<ExternalDisplayLinkReq>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = 'plugnmeet.ExternalDisplayLinkReq';
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    {
      no: 1,
      name: 'task',
      kind: 'enum',
      T: proto3.getEnumType(ExternalDisplayLinkTask),
    },
    {
      no: 2,
      name: 'url',
      kind: 'scalar',
      T: 9 /* ScalarType.STRING */,
      opt: true,
    },
    { no: 4, name: 'room_id', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 5, name: 'user_id', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): ExternalDisplayLinkReq {
    return new ExternalDisplayLinkReq().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): ExternalDisplayLinkReq {
    return new ExternalDisplayLinkReq().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): ExternalDisplayLinkReq {
    return new ExternalDisplayLinkReq().fromJsonString(jsonString, options);
  }

  static equals(
    a:
      | ExternalDisplayLinkReq
      | PlainMessage<ExternalDisplayLinkReq>
      | undefined,
    b: ExternalDisplayLinkReq | PlainMessage<ExternalDisplayLinkReq> | undefined
  ): boolean {
    return proto3.util.equals(ExternalDisplayLinkReq, a, b);
  }
}

/**
 * @generated from message plugnmeet.CreateEtherpadSessionRes
 */
export class CreateEtherpadSessionRes extends Message<CreateEtherpadSessionRes> {
  /**
   * @generated from field: bool status = 1;
   */
  status = false;

  /**
   * @generated from field: string msg = 2;
   */
  msg = '';

  /**
   * @generated from field: optional string pad_id = 3;
   */
  padId?: string;

  /**
   * @generated from field: optional string readonly_pad_id = 4;
   */
  readonlyPadId?: string;

  constructor(data?: PartialMessage<CreateEtherpadSessionRes>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = 'plugnmeet.CreateEtherpadSessionRes';
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'status', kind: 'scalar', T: 8 /* ScalarType.BOOL */ },
    { no: 2, name: 'msg', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    {
      no: 3,
      name: 'pad_id',
      kind: 'scalar',
      T: 9 /* ScalarType.STRING */,
      opt: true,
    },
    {
      no: 4,
      name: 'readonly_pad_id',
      kind: 'scalar',
      T: 9 /* ScalarType.STRING */,
      opt: true,
    },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): CreateEtherpadSessionRes {
    return new CreateEtherpadSessionRes().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): CreateEtherpadSessionRes {
    return new CreateEtherpadSessionRes().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): CreateEtherpadSessionRes {
    return new CreateEtherpadSessionRes().fromJsonString(jsonString, options);
  }

  static equals(
    a:
      | CreateEtherpadSessionRes
      | PlainMessage<CreateEtherpadSessionRes>
      | undefined,
    b:
      | CreateEtherpadSessionRes
      | PlainMessage<CreateEtherpadSessionRes>
      | undefined
  ): boolean {
    return proto3.util.equals(CreateEtherpadSessionRes, a, b);
  }
}

/**
 * @generated from message plugnmeet.CleanEtherpadReq
 */
export class CleanEtherpadReq extends Message<CleanEtherpadReq> {
  /**
   * @generated from field: string room_id = 1;
   */
  roomId = '';

  /**
   * @generated from field: string node_id = 2;
   */
  nodeId = '';

  /**
   * @generated from field: string pad_id = 3;
   */
  padId = '';

  constructor(data?: PartialMessage<CleanEtherpadReq>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = 'plugnmeet.CleanEtherpadReq';
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'room_id', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 2, name: 'node_id', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 3, name: 'pad_id', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): CleanEtherpadReq {
    return new CleanEtherpadReq().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): CleanEtherpadReq {
    return new CleanEtherpadReq().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): CleanEtherpadReq {
    return new CleanEtherpadReq().fromJsonString(jsonString, options);
  }

  static equals(
    a: CleanEtherpadReq | PlainMessage<CleanEtherpadReq> | undefined,
    b: CleanEtherpadReq | PlainMessage<CleanEtherpadReq> | undefined
  ): boolean {
    return proto3.util.equals(CleanEtherpadReq, a, b);
  }
}

/**
 * @generated from message plugnmeet.ChangeEtherpadStatusReq
 */
export class ChangeEtherpadStatusReq extends Message<ChangeEtherpadStatusReq> {
  /**
   * @generated from field: string room_id = 1;
   */
  roomId = '';

  /**
   * @generated from field: bool is_active = 2;
   */
  isActive = false;

  constructor(data?: PartialMessage<ChangeEtherpadStatusReq>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = 'plugnmeet.ChangeEtherpadStatusReq';
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'room_id', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 2, name: 'is_active', kind: 'scalar', T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): ChangeEtherpadStatusReq {
    return new ChangeEtherpadStatusReq().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): ChangeEtherpadStatusReq {
    return new ChangeEtherpadStatusReq().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): ChangeEtherpadStatusReq {
    return new ChangeEtherpadStatusReq().fromJsonString(jsonString, options);
  }

  static equals(
    a:
      | ChangeEtherpadStatusReq
      | PlainMessage<ChangeEtherpadStatusReq>
      | undefined,
    b:
      | ChangeEtherpadStatusReq
      | PlainMessage<ChangeEtherpadStatusReq>
      | undefined
  ): boolean {
    return proto3.util.equals(ChangeEtherpadStatusReq, a, b);
  }
}

/**
 * @generated from message plugnmeet.ApproveWaitingUsersReq
 */
export class ApproveWaitingUsersReq extends Message<ApproveWaitingUsersReq> {
  /**
   * @generated from field: string room_id = 1;
   */
  roomId = '';

  /**
   * @generated from field: string user_id = 2;
   */
  userId = '';

  constructor(data?: PartialMessage<ApproveWaitingUsersReq>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = 'plugnmeet.ApproveWaitingUsersReq';
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'room_id', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 2, name: 'user_id', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): ApproveWaitingUsersReq {
    return new ApproveWaitingUsersReq().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): ApproveWaitingUsersReq {
    return new ApproveWaitingUsersReq().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): ApproveWaitingUsersReq {
    return new ApproveWaitingUsersReq().fromJsonString(jsonString, options);
  }

  static equals(
    a:
      | ApproveWaitingUsersReq
      | PlainMessage<ApproveWaitingUsersReq>
      | undefined,
    b: ApproveWaitingUsersReq | PlainMessage<ApproveWaitingUsersReq> | undefined
  ): boolean {
    return proto3.util.equals(ApproveWaitingUsersReq, a, b);
  }
}

/**
 * @generated from message plugnmeet.UpdateWaitingRoomMessageReq
 */
export class UpdateWaitingRoomMessageReq extends Message<UpdateWaitingRoomMessageReq> {
  /**
   * @generated from field: string room_id = 1;
   */
  roomId = '';

  /**
   * @generated from field: string msg = 2;
   */
  msg = '';

  constructor(data?: PartialMessage<UpdateWaitingRoomMessageReq>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = 'plugnmeet.UpdateWaitingRoomMessageReq';
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'room_id', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 2, name: 'msg', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): UpdateWaitingRoomMessageReq {
    return new UpdateWaitingRoomMessageReq().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): UpdateWaitingRoomMessageReq {
    return new UpdateWaitingRoomMessageReq().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): UpdateWaitingRoomMessageReq {
    return new UpdateWaitingRoomMessageReq().fromJsonString(
      jsonString,
      options
    );
  }

  static equals(
    a:
      | UpdateWaitingRoomMessageReq
      | PlainMessage<UpdateWaitingRoomMessageReq>
      | undefined,
    b:
      | UpdateWaitingRoomMessageReq
      | PlainMessage<UpdateWaitingRoomMessageReq>
      | undefined
  ): boolean {
    return proto3.util.equals(UpdateWaitingRoomMessageReq, a, b);
  }
}

/**
 * @generated from message plugnmeet.UpdateUserLockSettingsReq
 */
export class UpdateUserLockSettingsReq extends Message<UpdateUserLockSettingsReq> {
  /**
   * @generated from field: string room_sid = 1;
   */
  roomSid = '';

  /**
   * @generated from field: string room_id = 2;
   */
  roomId = '';

  /**
   * @generated from field: string user_id = 3;
   */
  userId = '';

  /**
   * @generated from field: string service = 4;
   */
  service = '';

  /**
   * @generated from field: string direction = 5;
   */
  direction = '';

  /**
   * @generated from field: string Requested_user_id = 6;
   */
  RequestedUserId = '';

  constructor(data?: PartialMessage<UpdateUserLockSettingsReq>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = 'plugnmeet.UpdateUserLockSettingsReq';
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'room_sid', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 2, name: 'room_id', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 3, name: 'user_id', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 4, name: 'service', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 5, name: 'direction', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    {
      no: 6,
      name: 'Requested_user_id',
      kind: 'scalar',
      T: 9 /* ScalarType.STRING */,
    },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): UpdateUserLockSettingsReq {
    return new UpdateUserLockSettingsReq().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): UpdateUserLockSettingsReq {
    return new UpdateUserLockSettingsReq().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): UpdateUserLockSettingsReq {
    return new UpdateUserLockSettingsReq().fromJsonString(jsonString, options);
  }

  static equals(
    a:
      | UpdateUserLockSettingsReq
      | PlainMessage<UpdateUserLockSettingsReq>
      | undefined,
    b:
      | UpdateUserLockSettingsReq
      | PlainMessage<UpdateUserLockSettingsReq>
      | undefined
  ): boolean {
    return proto3.util.equals(UpdateUserLockSettingsReq, a, b);
  }
}
