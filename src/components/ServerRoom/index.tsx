import * as React from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

import UsersList from '../UsersList';
import Chat from '../../containers/Chat';
import GameRoomsList from '../GameRoomsList';
import { Server } from '../../common/interfaces';

const ServerRoom = (props: Server) => (
    <div className="ServerRoom">
        <div style={{flexGrow: 1, padding: '12px'}}>
            <Grid container={true} spacing={24}>
                <Grid item={true} xs={12} sm={9}>
                    <Paper
                        style={{ width: '80vw', height: '80vh',
                            maxWidth: '100%', maxHeight: '700px',
                            display: 'flex', alignItems: 'center', flexDirection: 'column', position: 'relative' }}
                    >
                        <Chat/>
                    </Paper>
                </Grid>
                <Grid item={true} xs={12} sm={3}>
                    <Paper
                        style={{ width: '80vw', height: '80vh',
                            maxWidth: '100%', maxHeight: '700px',
                            display: 'flex', alignItems: 'center', flexDirection: 'column', position: 'relative' }}
                    >
                        <UsersList />
                        <GameRoomsList />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    </div>
);

export { ServerRoom };
