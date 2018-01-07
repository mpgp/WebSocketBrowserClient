import { action, observable } from 'mobx';

export interface WebSocketMessage {
    Type: string;
    Payload?: any;
}

class WebSocketStore {
    @observable userName: string;
    @observable messages: WebSocketMessage[];
    @observable connectionStatus: boolean;
    private readonly WS_PATH = `ws://${window.location.hostname}:8181/consoleappsample`;
    private ws: WebSocket;

    constructor() {
        this.connectionStatus = false;
        this.messages = [];
        this.userName = '';
    }

    close() {
        this.ws.close();
    }

    @action
    connectToServer() {
        const wsImpl = WebSocket;
        this.ws = new wsImpl(this.WS_PATH);

        this.ws.onclose = this.OnClose;
        this.ws.onmessage = this.OnMessage;
    }

    @action
    OnClose = () => {
        this.connectionStatus = false;
        this.connectToServer();
    }

    @action
    OnMessage = ({ data }: any) => {
        const newMessage = JSON.parse(data) as WebSocketMessage;
        console.warn({
            str: data,
            obj: newMessage
        });

        if (newMessage.Type === 'AUTH_MESSAGE') {
            this.userName = newMessage.Payload.UserName;
            this.connectionStatus = newMessage.Payload.Status as boolean;
            if (!newMessage.Payload.Status) {
                alert(newMessage.Payload.Message);
            }
        } else {
            this.messages = [...this.messages, newMessage];
        }
    }

    send(data: WebSocketMessage) {
        this.ws.send(JSON.stringify(data));
    }
}

export default new WebSocketStore();
