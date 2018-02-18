import * as React from 'react';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';

export class AuthData {
    Login: string;
    Password: string;
}

interface AuthProps {
    errors: string[];
    onSubmit: (authData: AuthData) => void;
}

type AuthFormProps = AuthProps & WithStyles<'root' | 'Card' | 'Typography'>;

interface AuthFormState {
    LoginError: string;
    PasswordError: string;
}

const styles: StyleRulesCallback<'root'> = () => ({
    root: {display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '70%'},
    Card: {width: '300px', margin: '0 auto'},
    Typography: {textAlign: 'center'}
});

class AuthForm extends React.PureComponent<AuthFormProps, AuthFormState> {
    private authData = new AuthData();
    private get valid() {
        return this.state.LoginError || this.state.PasswordError;
    }

    constructor(props: AuthFormProps) {
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
        this.authData[name] = value;

        this.validate(name, value);
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.props.onSubmit(this.authData);
    }

    render() {
        const { LoginError, PasswordError } = this.state;
        return (
            <div className={this.props.classes.root}>
                <Card className={'AuthForm ' + this.props.classes.Card}>
                    <CardContent>
                        <Typography component="h2" variant="headline" className={this.props.classes.Typography}>
                            Sign In
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
                                variant={'raised'}
                                type="submit"
                                color="primary"
                                fullWidth={true}
                                disabled={!!this.valid}
                            >
                                Login
                            </Button>
                        </form>
                        <br />
                        <Divider />
                    </CardContent>
                    <CardActions>
                        <a href="/forgot">
                            <Button variant={'raised'} color="default">Forgot Password?</Button>
                        </a>
                        <a href="/signup">
                            <Button variant={'raised'} color="default">Sign Up</Button>
                        </a>
                    </CardActions>
                </Card>
            </div>
        );
    }

    private validate(name: string, value: string) {
        let newState = {};

        switch (name) {
            case 'Login': {
                let LoginError = '';
                if (value.length < 3) {
                    LoginError = 'Login must be a minimum of 3 characters';
                } else if (value.length > 12) {
                    LoginError = 'Login must be a maximum of 12 characters';
                } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
                    LoginError = 'The Login can consist only of letters and numbers';
                }
                newState = {LoginError};
                break;
            }
            case 'Password': {
                let PasswordError = '';
                if (value.length < 8) {
                    PasswordError = 'Password must be a minimum of 8 characters';
                } else if (value.length > 249) {
                    PasswordError = 'Password is too long';
                }
                newState = {PasswordError};
                break;
            }
            default: throw 'ArgumentException';
        }

        this.setState(newState);
    }
}

export default withStyles(styles)<AuthProps>(AuthForm);
