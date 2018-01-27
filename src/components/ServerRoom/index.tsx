import * as React from 'react';
import Typography from 'material-ui/Typography';

import Game from '../Game';
import Chat from '../../containers/Chat';
import { Server } from '../../common/interfaces';

const ServerRoom = (props: Server) => (
    <div className="ServerRoom">
        <Typography component="p" type="headline">
            {props.id} | {props.name} | {props.address} | {props.code}
        </Typography>
        <Game />
        <Chat/>
    </div>
);

export { ServerRoom };
