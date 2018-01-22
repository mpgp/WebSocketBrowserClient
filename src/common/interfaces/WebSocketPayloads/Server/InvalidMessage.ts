import { BaseMessage } from '../BaseMessage';
import { WebSocketPayloadTypes } from '../WebSocketPayloadTypes';

export class InvalidMessage extends BaseMessage {
    public Message: string;
    protected messageType = WebSocketPayloadTypes.InvalidMessage;
}
