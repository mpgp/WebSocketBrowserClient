import * as React from 'react';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent } from 'material-ui/Card';

export interface AuthData {
    Login: string;
    Password: string;
}

interface AuthFormProps {
    errors: string[];
    onSubmit: (authData: AuthData) => void;
}

interface AuthFormState {
    Login: string;
    Password: string;
}

class AuthForm extends React.Component<AuthFormProps, AuthFormState> {
    constructor(props: AuthFormProps) {
        super(props);

        this.state = {
            Login: '',
            Password: ','
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const name = event.target.name as 'Login';
        const value = event.target.value;
        this.setState({[name]: value});
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.props.onSubmit(this.state);
    }

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '70%'}}>
                <Card className="AuthForm" style={{width: '300px', margin: '0 auto'}}>
                    <CardContent>
                        <Typography component="h2" type="headline" style={{textAlign: 'center'}}>
                            Sign In
                            {this.props.errors && this.props.errors
                                .map((error: string) => <p key={error}>{error}</p>)}
                        </Typography>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                helperText="Enter your Login"
                                label="Login"
                                name="Login"
                                fullWidth={true}
                                onChange={this.handleChange}
                            />
                            <br />
                            <TextField
                                helperText="Enter your Password"
                                label="Password"
                                name="Password"
                                type="password"
                                fullWidth={true}
                                onChange={this.handleChange}
                            />
                            <br />
                            <br />
                            <Button
                                raised={true}
                                type="submit"
                                color="primary"
                                fullWidth={true}
                                disabled={!this.state.Login.trim() || !this.state.Password.trim()}
                            >
                                Login
                            </Button>
                        </form>
                        <br />
                        <Divider />
                    </CardContent>
                    <CardActions>
                        <a href="/forgot">
                            <Button
                                raised={true}
                                color="default"
                            >
                                Forgot Password?
                            </Button>
                        </a>
                        <a href="/signup">
                            <Button
                                raised={true}
                                color="default"
                            >
                                Sign Up
                            </Button>
                        </a>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default AuthForm;
