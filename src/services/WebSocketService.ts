import AppStore from '../stores/AppStore';
import { AuthMessage } from '../common/interfaces/WebSocketPayloads/Client';
import { BaseMessage, WebSocketMessage } from '../common/interfaces/WebSocketPayloads';

export interface Subscriber {
    messageType: string;
    callback: <T>(message: BaseMessage) => void | T;
}

export interface Subscription {
    unsubscribe: () => void;
}

class WebSocketService {
    private subscribersList: Subscriber[] = [];
    private ws: WebSocket;

    close() {
        if (this.ws) {
            this.ws.close();
        }
    }

    connectToServer(address: string) {
        this.ws = new WebSocket(`${address}/${process.env.REACT_APP_WEBSOCKET_PATH}`);

        this.ws.onopen = this.OnOpen.bind(this);
        this.ws.onmessage = this.OnMessage.bind(this);
    }

    send<T extends BaseMessage>(data: T) {
        this.ws.send(
            JSON.stringify({
                Type: data.toString(),
                Payload: data
            })
        );
    }

    subscribe(messageType: string, callback: <T>(message: BaseMessage) => void | T): Subscription {
        const newSubscriber: Subscriber = {messageType, callback};
        this.subscribersList.push(newSubscriber);
        return {
            unsubscribe: () => {
                this.subscribersList.splice(
                    this.subscribersList.findIndex((subscriber) => subscriber === newSubscriber),
                    1);
            }
        };
    }

    private OnOpen() {
        this.send(new AuthMessage(AppStore.userInfo.token));
    }

    private OnMessage({ data }: {data: string}) {
        const newMessage = JSON.parse(data) as WebSocketMessage<BaseMessage>;
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
