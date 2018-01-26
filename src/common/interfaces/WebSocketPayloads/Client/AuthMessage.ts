import { BaseMessage } from '../BaseMessage';
import { WebSocketPayloadTypes } from '../WebSocketPayloadTypes';

export class AuthMessage extends BaseMessage {
    public Token: string;
    protected messageType = WebSocketPayloadTypes.AuthMessage;

    constructor(token: string) {
        super();
        this.Token = token;
    }
}
