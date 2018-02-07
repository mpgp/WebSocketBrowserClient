import { BaseMessage } from '../BaseMessage';
import { WebSocketPayloadTypes } from '../WebSocketPayloadTypes';

export class AuthMessage extends BaseMessage {
    public Message: string;
    public UsersList: string[];
    protected messageType = WebSocketPayloadTypes.AuthMessage;
}
