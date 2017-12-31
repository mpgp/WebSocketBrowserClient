import { action, observable } from 'mobx';

export interface WebSocketMessage {
    type: string;
    payload?: any;
}

class WebSocketStore {
    @observable userName: string;
    @observable messages: WebSocketMessage[];
    @observable connectionStatus: boolean;
    private readonly WS_PATH = 'ws://echo.websocket.org'; // 'ws://localhost:8181/consoleappsample'
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
        this.messages = [...this.messages, JSON.parse(data)];
    }

    send(data: WebSocketMessage) {
        this.ws.send(JSON.stringify(data));
    }

    @action
    setConnectionStatus(status: boolean) {
        this.connectionStatus = status;
    }

    @action
    setUserName(userName: string) {
        this.userName = userName;
    }
}

export default new WebSocketStore();
