import { BaseMessage, WebSocketPayloadTypes } from '../';

export class ChatMessage extends BaseMessage {
    public Message: string;

    protected messageType = WebSocketPayloadTypes.ChatMessage;

    constructor(message: string) {
        super();
        this.Message = message;
    }
}
