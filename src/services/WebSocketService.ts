export interface Subscriber {
    messageType: string;
    callback: (message: any) => any;
}

export interface Subscription {
    unsubscribe: () => void;
}

export interface WebSocketMessage {
    Type: string;
    Payload?: any;
}

class WebSocketService {
    private subscribersList: Subscriber[] = [];
    private ws: WebSocket;

    close() {
        this.ws.close();
    }

    connectToServer(address: string) {
        this.ws = new WebSocket(`${address}/${process.env.WEBSOCKET_PATH}`);

        this.ws.onopen = this.OnOpen.bind(this);
        this.ws.onmessage = this.OnMessage.bind(this);
    }

    send(data: any) {
        this.ws.send(JSON.stringify(data));
    }

    subscribe(messageType: string, callback: (message: any) => any): Subscription {
        this.subscribersList.push({messageType, callback});
        return {
            unsubscribe: () => { this.subscribersList.splice(this.subscribersList.findIndex(callback), 1); }
        };
    }

    private OnOpen() {
        const auth = JSON.parse(localStorage.getItem('auth') || '{}');
        this.send({
            Type: 'AUTH_MESSAGE',
            Payload: {
                AuthToken: auth.token
            }
        });
    }

    private OnMessage({ data }: any) {
        const newMessage = JSON.parse(data) as WebSocketMessage;
        console.warn({
            str: data,
            obj: newMessage
        });

        this.subscribersList
            .filter((subscriber) => subscriber.messageType === newMessage.Type)
            .forEach((subscriber) => subscriber.callback(newMessage.Payload));
    }
}

export default new WebSocketService();
