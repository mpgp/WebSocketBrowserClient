import * as React from 'react';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent } from 'material-ui/Card';

export interface RegisterData {
    Login: string;
    Password: string;
}

interface SignUpFormFormProps {
    errors: string[];
    onSubmit: (registerData: RegisterData) => void;
}

interface SignUpFormState {
    Login: string;
    Password: string;
}

class SignUpForm extends React.Component<SignUpFormFormProps, SignUpFormState> {
    constructor(props: SignUpFormFormProps) {
        super(props);

        this.state = {
            Login: '',
            Password: ','
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleLoginChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({Login: event.target.value});
    }

    handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({Password: event.target.value});
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.props.onSubmit(this.state);
    }

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '70%'}}>
                <Card className="SignUpForm" style={{width: '300px', margin: '0 auto'}}>
                    <CardContent>
                        <Typography component="h2" type="headline" style={{textAlign: 'center'}}>
                            Sign Up
                            {this.props.errors && this.props.errors
                                .map((error: string) => <p key={error}>{error}</p>)}
                        </Typography>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                helperText="Enter your Login"
                                label="Login"
                                fullWidth={true}
                                onChange={this.handleLoginChange}
                            />
                            <br />
                            <TextField
                                helperText="Enter your Password"
                                label="Password"
                                type="password"
                                fullWidth={true}
                                onChange={this.handlePasswordChange}
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
                                Register
                            </Button>
                        </form>
                        <br />
                        <Divider />
                    </CardContent>
                    <CardActions>
                        <a href="/">
                            <Button
                                raised={true}
                                color="default"
                            >
                                Sign In
                            </Button>
                        </a>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default SignUpForm;
