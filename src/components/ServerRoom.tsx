import * as React from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';

import UsersListContainer from '../containers/UsersListContainer';
import ChatContainer from '../containers/ChatContainer';
import GameRoomsList from './GameRoomsList';

type ServerRoomProps = WithStyles<'root' | 'Paper'>;

const styles: StyleRulesCallback<'root'> = () => ({
    root: {flexGrow: 1, padding: '12px'},
    Paper: {
        width: '80vw',
        height: '80vh',
        maxWidth: '100%',
        maxHeight: '700px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'relative'
    }
});

const ServerRoom = (props: ServerRoomProps) => (
    <div className="ServerRoom">
        <div className={props.classes.root}>
            <Grid container={true} spacing={24}>
                <Grid item={true} xs={12} sm={9}>
                    <Paper className={props.classes.Paper}>
                        <ChatContainer />
                    </Paper>
                </Grid>
                <Grid item={true} xs={12} sm={3}>
                    <Paper className={props.classes.Paper}>
                        <UsersListContainer />
                        <GameRoomsList />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    </div>
);

export default withStyles(styles)<{}>(ServerRoom);