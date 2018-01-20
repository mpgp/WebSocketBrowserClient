import * as React from 'react';

export interface AuthData {
    Login: string;
    Password: string;
}

interface AuthFormProps {
    onSubmit: (authData: AuthData) => void;
}

class AuthForm extends React.Component<AuthFormProps, {}> {
    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.onSubmit({
            Login: (this.refs.Login as HTMLInputElement).value,
            Password: (this.refs.Password as HTMLInputElement).value,
        });
    }

    render() {
        return (
            <div className='AuthForm'>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            <span><b>Login:</b> </span>
                            <p>
                                <input type='text' name='Login' ref='Login' />
                            </p>
                        </label>
                        <label>
                            <span><b>Password:</b> </span>
                            <p><input type='password' name='Password' ref='Password' /></p>
                        </label>
                    </div>
                    <div>
                        <button type='submit'>Submit!</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AuthForm;
