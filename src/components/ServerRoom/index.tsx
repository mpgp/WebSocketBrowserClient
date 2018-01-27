import * as React from 'react';

import Game from '../Game';
import Chat from '../../containers/Chat';
import { Server } from '../../common/interfaces';

const ServerRoom = (props: Server) => (
    <div className="ServerRoom">
        <p>{props.id} | {props.name} | {props.address} | {props.code}</p>
        <Game />
        <Chat/>
    </div>
);

export { ServerRoom };
