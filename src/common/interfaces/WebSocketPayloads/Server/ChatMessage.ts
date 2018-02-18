import { BaseMessage, WebSocketPayloadTypes } from '../';

export class ChatMessage extends BaseMessage {
    public Login: string;
    public Message: string;
    public Time: number;

    protected messageType = WebSocketPayloadTypes.ChatMessage;
}
