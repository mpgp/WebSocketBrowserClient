import { BaseMessage, WebSocketPayloadTypes } from '../';

export class AuthMessage extends BaseMessage {
    public Message: string;
    public UsersList: string[];

    protected messageType = WebSocketPayloadTypes.AuthMessage;
}
