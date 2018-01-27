import { BaseMessage } from './BaseMessage';

export class WebSocketMessage<T extends BaseMessage> {
    public Type: string;
    public Payload: T;

    constructor(message: T) {
        this.Type = message.toString();
    }
}
