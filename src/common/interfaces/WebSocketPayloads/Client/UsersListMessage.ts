import { BaseMessage } from '../BaseMessage';
import { WebSocketPayloadTypes } from '../WebSocketPayloadTypes';

export class UsersListMessage extends BaseMessage {
    protected messageType = WebSocketPayloadTypes.UsersListMessage;
}
