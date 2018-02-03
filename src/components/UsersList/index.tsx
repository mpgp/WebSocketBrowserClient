import * as React from 'react';
import Paper from 'material-ui/Paper';

const UsersListStyles = {
    width: 'calc( 100% - 20px )',
    margin: 10,
    'overflow-y': 'scroll',
    height: 'calc( 100% - 80px )'
};

const UsersList = () => (
    <Paper style={UsersListStyles} className="with-scrollbar">
        {Array.from(Array(20).keys()).map(value => <p key={value}>User #{value}</p>)}
    </Paper>
);

export default UsersList;
