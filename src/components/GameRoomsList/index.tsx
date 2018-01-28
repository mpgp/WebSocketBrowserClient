import * as React from 'react';
import Paper from 'material-ui/Paper';

const GameRoomsList = () => (
    <Paper
        style={{
            width: 'calc( 100% - 20px )',
            margin: 10,
            overflowY: 'scroll',
            height: 'calc( 50% - 80px )'
        }}
        className="with-scrollbar"
    >
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

export default GameRoomsList;
