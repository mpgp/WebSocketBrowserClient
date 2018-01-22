import { action, observable } from 'mobx';

export interface WebSocketMessage {
    Type: string;
    Payload?: any;
}

class WebSocketStore {
    @observable userName: string;
    @observable messages: WebSocketMessage[];
    @observable connectionStatus: boolean;
    private ws: WebSocket;

    constructor() {
        this.connectionStatus = false;
        this.messages = [];
        this.userName = '';
    }

    close() {
        this.connectionStatus = false;
        this.ws.close();
    }

    @action
    connectToServer(address: string) {
        const wsImpl = WebSocket;
        this.ws = new wsImpl(`${address}/${process.env.WEBSOCKET_PATH}`);

        this.ws.onopen = this.OnOpen.bind(this);
        this.ws.onmessage = this.OnMessage.bind(this);
    }

    @action
    OnOpen() {
        const auth = JSON.parse(localStorage.getItem('auth') || '{}');
        this.send({
            Type: 'AUTH_MESSAGE',
            Payload: {
                AuthToken: auth.token
            }
        });
    }

    @action
    OnMessage({ data }: any) {
        const newMessage = JSON.parse(data) as WebSocketMessage;
        console.warn({
            str: data,
            obj: newMessage
        });

        if (newMessage.Type === 'CHAT_MESSAGE') {
            this.messages = [...this.messages, newMessage];
        } else if (newMessage.Type === 'AUTH_MESSAGE' && newMessage.Payload.Status) {
            this.connectionStatus = true;
        }
    }

    send(data: WebSocketMessage) {
        this.ws.send(JSON.stringify(data));
    }
}

export default new WebSocketStore();
