import * as React from 'react';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent } from 'material-ui/Card';

export class SignUpData {
    Login: string;
    Password: string;
}

interface SignUpFormFormProps {
    errors: string[];
    onSubmit: (registerData: SignUpData) => void;
}

interface SignUpFormState {
    LoginError: string;
    PasswordError: string;
}

class SignUpForm extends React.PureComponent<SignUpFormFormProps, SignUpFormState> {
    private signUpData = new SignUpData();
    private get valid() {
        return this.state.LoginError || this.state.PasswordError;
    }

    constructor(props: SignUpFormFormProps) {
        super(props);

        this.state = {
            LoginError: '',
            PasswordError: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const name = event.target.name as 'Login';
        const value = event.target.value;
        this.signUpData[name] = value;

        const errorsState = this.validate(name, value) as SignUpFormState;
        this.setState({...errorsState});
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.props.onSubmit(this.signUpData);
    }

    render() {
        const { LoginError, PasswordError } = this.state;
        return (
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '70%'}}>
                <Card className="SignUpForm" style={{width: '300px', margin: '0 auto'}}>
                    <CardContent>
                        <Typography component="h2" type="headline" style={{textAlign: 'center'}}>
                            Sign Up
                        </Typography>
                        {this.props.errors && this.props.errors
                            .map((error: string) => <p key={error}>{error}</p>)}
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                error={!!LoginError}
                                helperText={LoginError ? LoginError : 'Enter your Login'}
                                label="Login"
                                name="Login"
                                fullWidth={true}
                                onChange={this.handleChange}
                            />
                            <br />
                            <TextField
                                error={!!PasswordError}
                                helperText={PasswordError ? PasswordError : 'Enter your Password'}
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
                                disabled={!!this.valid}
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

    private validate(name: string, value: string) {
        let errorMessage = '';
        switch (name) {
            case 'Login': {
                if (value.length < 3) {
                    errorMessage = 'Login must be a minimum of 3 characters';
                } else if (value.length > 12) {
                    errorMessage = 'Login must be a maximum of 12 characters';
                } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
                    errorMessage = 'The Login can consist only of letters and numbers';
                }
                return {LoginError: errorMessage};
            }
            case 'Password': {
                if (value.length < 8) {
                    errorMessage = 'Password must be a minimum of 8 characters';
                } else if (value.length > 249) {
                    errorMessage = 'Password is too long';
                }
                return {PasswordError: errorMessage};
            }
            default: throw 'ArgumentException';
        }
    }
}

export default SignUpForm;
