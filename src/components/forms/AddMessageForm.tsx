import * as React from 'react';
import Send from 'material-ui-icons/Send';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';

interface AddMessageFormProps {
    onSubmit: (message: string) => void;
}

interface AddMessageFormState {
    message: string;
}

class AddMessageForm extends React.PureComponent<AddMessageFormProps, AddMessageFormState> {
    constructor(props: AddMessageFormProps) {
        super(props);
        this.state = {
            message: ' '
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({message: event.target.value});
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (this.state.message.trim().length > 0) {
            this.props.onSubmit(this.state.message);
            this.setState({message: ''});
        }
    }

    render() {
        return (
            <div className="AddMessageForm" style={{marginLeft: '10px'}}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        id="multiline-flexible"
                        label="Message..."
                        multiline={false}
                        value={this.state.message}
                        onChange={this.handleChange}
                        margin="normal"
                        autoFocus={true}
                        style={{width: 'calc(100% - 50px)'}}
                    />
                    <IconButton
                        title="Send message"
                        type="submit"
                        color="primary"
                        disabled={this.state.message.trim().length === 0}
                    >
                        <Send />
                    </IconButton>
                </form>
            </div>
        );
    }
}

export default AddMessageForm;
