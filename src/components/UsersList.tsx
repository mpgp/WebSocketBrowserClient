import * as React from 'react';
import Paper from 'material-ui/Paper';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';

interface UsersProps {
    users: string[];
}

type UsersListProps = UsersProps & WithStyles<'root'>;

const styles: StyleRulesCallback<'root'> = () => ({
    root: {
        width: 'calc( 100% - 20px )',
        margin: 10,
        overflowY: 'scroll',
        height: 'calc( 100% - 80px )'
    }
});

const UsersList = (props: UsersListProps) => (
    <Paper className={'with-scrollbar ' + props.classes.root}>
        {props.users.map(value => <p key={value}>{value}</p>)}
    </Paper>
);

export default withStyles(styles)<UsersProps>(UsersList);
