import { ICurrentUser } from './session';

export interface IChatMsg {
  type: 'CHAT';
  message_id: string;
  time: string;
  isPrivate: boolean;
  from: ICurrentUser;
  to?: string;
  msg: string;
}

export enum SystemMsgType {
  RAISE_HAND = 'RAISE_HAND',
  LOWER_HAND = 'LOWER_HAND',
  OTHER_USER_LOWER_HAND = 'OTHER_USER_LOWER_HAND',
  FILE_UPLOAD = 'FILE_UPLOAD',
  INFO = 'INFO',
  ALERT = 'ALERT',
  SEND_CHAT_MSGS = 'SEND_CHAT_MSGS',
  RENEW_TOKEN = 'RENEW_TOKEN',
  UPDATE_LOCK_SETTINGS = 'UPDATE_LOCK_SETTINGS',
  INIT_WHITEBOARD = 'INIT_WHITEBOARD',
  USER_VISIBILITY_CHANGE = 'USER_VISIBILITY_CHANGE',
  EXTERNAL_MEDIA_PLAYER_EVENTS = 'EXTERNAL_MEDIA_PLAYER_EVENTS',
  POLL_CREATED = 'POLL_CREATED',
  NEW_POLL_RESPONSE = 'NEW_POLL_RESPONSE',
  POLL_CLOSED = 'POLL_CLOSED',
  JOIN_BREAKOUT_ROOM = 'JOIN_BREAKOUT_ROOM',
}
