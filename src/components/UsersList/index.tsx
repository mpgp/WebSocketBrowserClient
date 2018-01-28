import * as React from 'react';
import Paper from 'material-ui/Paper';

const UsersList = () => (
    <Paper
        style={{
            width: 'calc( 100% - 20px )',
            margin: 10,
            overflowY: 'scroll',
            height: 'calc( 100% - 80px )'
        }}
        className="with-scrollbar"
    >
        {Array.from(Array(20).keys()).map(value => <p key={value}>User #{value}</p>)}
    </Paper>
);

export default UsersList;
