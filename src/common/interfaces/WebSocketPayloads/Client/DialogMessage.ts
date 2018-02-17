import { BaseMessage } from '../BaseMessage';
import { WebSocketPayloadTypes } from '../WebSocketPayloadTypes';

export class DialogMessage extends BaseMessage {
    public Message: string;
    public Receiver: string;
    protected messageType = WebSocketPayloadTypes.DialogMessage;

    constructor(message: string, receiver: string) {
        super();
        this.Message = message;
        this.Receiver = receiver;
    }
}
