import * as React from 'react';

import { Server } from '../../common/interfaces';
import Chat from '../Chat/Chat';
import Game from '../Game/Game';

const ServerRoom = (props: Server) => (
    <div className='ServerRoom'>
        <p>{props.id} | {props.name} | {props.address} | {props.code}</p>
        <Game />
        <Chat/>
    </div>
);

export { ServerRoom };
