import { BaseMessage } from '../BaseMessage';
import { WebSocketPayloadTypes } from '../WebSocketPayloadTypes';

export class UsersListMessage extends BaseMessage {
    public UsersList: string[];
    protected messageType = WebSocketPayloadTypes.UsersListMessage;
}
