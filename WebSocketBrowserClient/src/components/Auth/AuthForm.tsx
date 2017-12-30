import * as React from 'react';

interface AuthFormProps {
    onSubmit: any;
}

class AuthForm extends React.Component<AuthFormProps, {}> {
    handleSubmit = (event: any) => {
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
                            <input type="text" name="userName" ref="userName" />
                        </label>
                    </p>
                    <p>
                        <button type="submit">Log In!</button>
                    </p>
                </form>
            </div>
        );
    }
}

export default AuthForm;