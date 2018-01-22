import { BaseMessage } from '../BaseMessage';
import { WebSocketPayloadTypes } from '../WebSocketPayloadTypes';

export class AuthMessage extends BaseMessage {
    public AuthToken: string;
    protected messageType = WebSocketPayloadTypes.AuthMessage;

    constructor(authToken: string) {
        super();
        this.AuthToken = authToken;
    }
}
