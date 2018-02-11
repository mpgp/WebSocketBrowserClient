import * as React from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

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
            <Paper onClick={this.handleClick} style={{marginBottom: '15px'}}>
                <Grid container={true} spacing={8}>
                    <Grid item={true} xs={3}>
                        <img
                            style={{margin: '5px'}}
                            src="https://image.flaticon.com/icons/svg/25/25231.svg"
                            height="40"
                            width="40"
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

const DialogsList = ({dialogs, onPickDialog}: DialogsListProps) => (
    <div className="DialogsListContainer">
        {
            dialogs.map((dialog: Dialog) => (
                <DialogItem Login={dialog.Login} Items={dialog.Items} onPickDialog={onPickDialog} key={dialog.Login} />
            ))
        }
    </div>
);

export default DialogsList;
