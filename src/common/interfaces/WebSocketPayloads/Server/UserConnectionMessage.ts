import { BaseMessage } from '../BaseMessage';
import { WebSocketPayloadTypes } from '../WebSocketPayloadTypes';

export class UserConnectionMessage extends BaseMessage {
    public Login: string;
    public Status: string;
    protected messageType = WebSocketPayloadTypes.UserConnectionMessage;
}
