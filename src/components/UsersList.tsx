import * as React from 'react';
import Paper from 'material-ui/Paper';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';

interface UsersProps {
    users: string[];
    handleClick: (login: string) => void;
}

type UsersListProps = UsersProps & WithStyles<'root'>;

const styles: StyleRulesCallback<'root'> = () => ({
    root: {
        width: 'calc( 100% - 20px )',
        margin: 10,
        overflowY: 'auto',
        height: 'calc( 100% - 80px )'
    }
});

class UsersList extends React.PureComponent<UsersListProps, {}> {
    constructor(props: UsersListProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e: React.MouseEvent<HTMLElement>) {
        const login = (e.target as HTMLElement).getAttribute('data-login');
        if (login) {
            this.props.handleClick(login);
        }
    }

    render() {
        return (
            <Paper className={'with-scrollbar ' + this.props.classes.root} onClick={this.handleClick}>
                {this.props.users.map(value => (
                    <p key={value} data-login={value}>{value}</p>
                ))}
            </Paper>
        );
    }
}

export default withStyles(styles)<UsersProps>(UsersList);
