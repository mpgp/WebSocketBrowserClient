import * as React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

interface AddMessageFormProps {
    onSubmit: (message: string) => void;
}

interface AddMessageFormState {
    message: string;
}

class AddMessageForm extends React.Component<AddMessageFormProps, AddMessageFormState> {
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
            <div className="AddMessageForm">
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        id="multiline-flexible"
                        label="Message..."
                        multiline={false}
                        value={this.state.message}
                        onChange={this.handleChange}
                        margin="normal"
                    />
                    <Button
                        raised={true}
                        type="submit"
                        color="primary"
                        disabled={this.state.message.trim().length === 0}
                    >
                        Send!
                    </Button>
                </form>
            </div>
        );
    }
}

export default AddMessageForm;
