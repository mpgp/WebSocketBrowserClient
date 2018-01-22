import * as React from 'react';

import Chat from '../Chat/Chat';
import Game from '../Game/Game';
import { Server } from '../../common/interfaces';

const ServerRoom = (props: Server) => (
    <div className='ServerRoom'>
        <p>{props.id} | {props.name} | {props.address} | {props.code}</p>
        <Game />
        <Chat/>
    </div>
);

export { ServerRoom };
