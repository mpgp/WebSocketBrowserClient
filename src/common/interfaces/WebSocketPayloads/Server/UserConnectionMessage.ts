import { BaseMessage, WebSocketPayloadTypes } from '../';

export class UserConnectionMessage extends BaseMessage {
    public Login: string;
    public Status: string;

    protected messageType = WebSocketPayloadTypes.UserConnectionMessage;
}
