import * as React from 'react';
import Badge from 'material-ui/Badge';
import MailIcon from 'material-ui-icons/Mail';
import IconButton from 'material-ui/IconButton';
import OpenWith from 'material-ui-icons/OpenWith';
import Slide, { SlideProps } from 'material-ui/transitions/Slide';
import Dialog, { DialogContent, DialogTitle, } from 'material-ui/Dialog';

import { PrivateMessagesContainer } from '../containers';

interface HeaderMessagesPanelProps {
    unreadDialogs: number;
}

interface HeaderMessagesPanelState {
    isOpen: boolean;
}

const moveDialogStyles = {
    position: 'absolute' as 'absolute', // i love sTypedScript :D
    cursor: 'move',
    left: 0,
    top: 0
};

class HeaderMessagesPanel extends React.PureComponent<HeaderMessagesPanelProps, HeaderMessagesPanelState> {
    constructor(props: HeaderMessagesPanelProps) {
        super(props);
        this.state = { isOpen: false };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleOpen() {
        this.setState({ isOpen: true });
    }

    handleClose() {
        this.setState({ isOpen: false });
    }

    render() {
        return (
            <span>
                <IconButton title="Private messages" onClick={this.handleOpen}>
                    <Badge badgeContent={this.props.unreadDialogs} color="secondary">
                        <MailIcon/>
                    </Badge>
                </IconButton>
                <Dialog
                    open={this.state.isOpen}
                    transition={this.transition}
                    keepMounted={true}
                    onClose={this.handleClose}
                >
                <DialogTitle id="HeaderMessagesPanelTitle">
                    <div title="Move dialog" className="move-dialog" style={moveDialogStyles}>
                        <OpenWith />
                    </div>
                    Private messages
                </DialogTitle>
                    <DialogContent>
                        {this.state.isOpen && <PrivateMessagesContainer />}
                    </DialogContent>
                </Dialog>
            </span>
        );
    }

    componentDidMount() {
        setTimeout(
            () => {
            const title = document.getElementById('HeaderMessagesPanelTitle');
            if (!title) {
                return;
            }

            const draggableIcon = title.querySelector('.move-dialog') as HTMLElement;
            if (!draggableIcon) {
                return;
            }

            const modal = title.parentElement;
            if (!modal) {
                return;
            }

            const divMove = (e: MouseEvent) => {
                modal.style.top = e.clientY - 10 + 'px';
                modal.style.left = e.clientX - 10 + 'px';
            };

            modal.style.position = 'absolute';
            modal.style.margin = '0';
            draggableIcon.addEventListener(
                'mousedown',
                () => window.addEventListener('mousemove', divMove, true),
                false
            );
            window.addEventListener(
                'mouseup',
                () => window.removeEventListener('mousemove', divMove, true),
                false
            );
        },
            1000);
    }

    transition(props: SlideProps) {
        return <Slide direction="up" {...props} />;
    }
}

export default HeaderMessagesPanel;
