import { BaseMessage } from '../BaseMessage';
import { WebSocketPayloadTypes } from '../WebSocketPayloadTypes';

export enum StatusCode {
    Error,
    Success
}

export class AuthMessage extends BaseMessage {
    public Message: string;
    public Status: StatusCode;
    protected messageType = WebSocketPayloadTypes.AuthMessage;
}
