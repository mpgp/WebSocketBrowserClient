import { BaseMessage, WebSocketPayloadTypes } from '../';

export class InvalidMessage extends BaseMessage {
    public Message: string;

    protected messageType = WebSocketPayloadTypes.InvalidMessage;
}
