export class BaseMessage {
    protected messageType: string;

    public toString() {
        return this.messageType;
    }
}
