import * as React from 'react';
import Paper from 'material-ui/Paper';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';

type GameRoomsListProps = WithStyles<'root'>;

const styles: StyleRulesCallback<'root'> = () => ({
    root: {
        width: 'calc( 100% - 20px )',
        margin: 10,
        overflowY: 'auto',
        height: 'calc( 100% - 80px )'
    }
});

const GameRoomsList = ({classes}: GameRoomsListProps) => (
    <Paper className={'with-scrollbar ' + classes.root}>
        {
            Array.from(Array(20).keys())
                .sort((a, b) => Math.random() - 0.5)
                .map(value => (
                    <p key={value}>
                        Game #{1 + value} |
                        {
                            [
                                'Killing Floor',
                                'Mortal Kombat 3',
                                'Street Fighter V',
                                'Battle City',
                            ][Math.floor(Math.random() * 4)]
                        }
                    </p>
                ))
        }
    </Paper>
);

export default withStyles(styles)<{}>(GameRoomsList);
