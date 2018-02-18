import { BaseMessage, WebSocketPayloadTypes } from '../';

export class DialogMessage extends BaseMessage {
    public Login: string;
    public Message: string;
    public Receiver: string;
    public Time: number;

    protected messageType = WebSocketPayloadTypes.DialogMessage;
}
