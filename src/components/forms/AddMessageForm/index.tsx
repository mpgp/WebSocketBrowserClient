import * as React from 'react';

interface AddMessageFormProps {
    onSubmit: (message: string) => void;
}

class AddMessageForm extends React.Component<AddMessageFormProps, {}> {
    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const messageInput = (this.refs.message as HTMLInputElement);
        this.props.onSubmit(messageInput.value);
        messageInput.value = '';
    }

    render() {
        return (
            <div className="AuthForm">
                <form onSubmit={this.handleSubmit}>
                    <p>
                        <label>
                            <span><b>Message:</b> </span>
                            <input type="text" name="message" ref="message" />
                        </label>
                    </p>
                    <p>
                        <button type="submit">Send!</button>
                    </p>
                </form>
            </div>
        );
    }
}

export default AddMessageForm;
