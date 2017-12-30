import * as React from 'react';

interface AuthFormProps {
    onSubmit: (userName: string) => void;
}

class AuthForm extends React.Component<AuthFormProps, {}> {
    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.onSubmit((this.refs.userName as HTMLInputElement).value);
    };

    render() {
        return (
            <div className='AuthForm'>
                <form onSubmit={this.handleSubmit}>
                    <p>
                        <label>
                            <span><b>Login:</b> </span>
                            <input type='text' name='userName' ref='userName' />
                        </label>
                    </p>
                    <p>
                        <button type='submit'>Log In!</button>
                    </p>
                </form>
            </div>
        );
    }
}

export default AuthForm;