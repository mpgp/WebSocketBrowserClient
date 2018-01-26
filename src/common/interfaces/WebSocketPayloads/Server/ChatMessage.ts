import { BaseMessage } from '../BaseMessage';
import { WebSocketPayloadTypes } from '../WebSocketPayloadTypes';

export class ChatMessage extends BaseMessage {
    public Message: string;
    public Time: number;
    public Login: string;
    protected messageType = WebSocketPayloadTypes.ChatMessage;
}
