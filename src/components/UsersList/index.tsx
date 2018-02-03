import * as React from 'react';
import Paper from 'material-ui/Paper';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';

type UsersListProps = WithStyles<'root'>;

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
        {Array.from(Array(20).keys()).map(value => <p key={value}>User #{value}</p>)}
    </Paper>
);

export default withStyles(styles)<{}>(UsersList);
