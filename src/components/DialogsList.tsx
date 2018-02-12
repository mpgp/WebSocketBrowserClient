import * as React from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';

import { Dialog } from '../stores';

interface DialogItemProps extends Dialog {
    onPickDialog: (Login: string) => void;
}

class DialogItem extends React.PureComponent<DialogItemProps, {}> {
    constructor(props: DialogItemProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onPickDialog(this.props.Login);
    }

    render() {
        const {Items, Login} = this.props;

        return (
            <Paper onClick={this.handleClick} style={{marginTop: '15px'}}>
                <Grid container={true} spacing={8}>
                    <Grid item={true} xs={3}>
                        <Avatar
                            style={{margin: '5px'}}
                            src={`${process.env.REACT_APP_API_PATH}user/${Login}/avatar.jpg`}
                        />
                    </Grid>
                    <Grid item={true} xs={9}>
                        <span>{Login}</span>
                        <p>{Items[Items.length - 1].Message}</p>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}
interface DialogsListProps {
    dialogs: Dialog[];
    onPickDialog: (Login: string) => void;
}

type DialogsListPropsWithStyles = DialogsListProps & WithStyles<'root'>;

const styles: StyleRulesCallback<'root'> = () => ({
    root: {
        width: '400px',
        margin: 10,
        overflowY: 'auto',
        overflowX: 'hidden',
        maxHeight: '245px'
    }
});

const DialogsList = ({classes, dialogs, onPickDialog}: DialogsListPropsWithStyles) => (
    <Paper className={'with-scrollbar ' + classes.root}>
        {
            dialogs.map((dialog: Dialog) => (
                <DialogItem Login={dialog.Login} Items={dialog.Items} onPickDialog={onPickDialog} key={dialog.Login} />
            ))
        }
    </Paper>
);

export default withStyles(styles)<DialogsListProps>(DialogsList);
