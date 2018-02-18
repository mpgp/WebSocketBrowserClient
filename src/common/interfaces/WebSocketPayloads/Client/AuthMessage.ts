import { BaseMessage, WebSocketPayloadTypes } from '../';

export class AuthMessage extends BaseMessage {
    public Token: string;

    protected messageType = WebSocketPayloadTypes.AuthMessage;

    constructor(token: string) {
        super();
        this.Token = token;
    }
}
