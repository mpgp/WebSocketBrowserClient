import * as React from 'react';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';

export class SignUpData {
    Login: string;
    Password: string;
    RepeatPassword: string;
}

interface SignUpProps {
    errors: string[];
    onSubmit: (registerData: SignUpData) => void;
}

type SignUpFormProps = SignUpProps & WithStyles<'root' | 'Card' | 'Typography'>;

interface SignUpFormState {
    LoginError: string;
    PasswordError: string;
    RepeatPasswordError: string;
}

const styles: StyleRulesCallback<'root'> = () => ({
    root: {display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '70%'},
    Card: {width: '300px', margin: '0 auto'},
    Typography: {textAlign: 'center'}
});

class SignUpForm extends React.PureComponent<SignUpFormProps, SignUpFormState> {
    private signUpData = new SignUpData();
    private get valid() {
        return !this.state.LoginError && this.signUpData.Login
            && !this.state.PasswordError && this.signUpData.Password
            && !this.state.RepeatPasswordError && this.signUpData.RepeatPassword;
    }

    constructor(props: SignUpFormProps) {
        super(props);

        this.state = {
            LoginError: '',
            PasswordError: '',
            RepeatPasswordError: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const name = event.target.name as 'Login';
        const value = event.target.value;
        this.signUpData[name] = value;

        this.validate(name, value);
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const signUpData = {...this.signUpData};
        delete signUpData.RepeatPassword;
        this.props.onSubmit(signUpData);
    }

    render() {
        const { LoginError, PasswordError, RepeatPasswordError } = this.state;
        return (
            <div className={this.props.classes.root}>
                <Card className={'SignUpForm ' + this.props.classes.Card}>
                    <CardContent>
                        <Typography component="h2" variant="headline" className={this.props.classes.Typography}>
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
                            <TextField
                                error={!!RepeatPasswordError}
                                helperText={RepeatPasswordError ? RepeatPasswordError : 'Repeat your Password'}
                                label="Repeat Password"
                                name="RepeatPassword"
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
                                disabled={!this.valid}
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
                                variant={'raised'}
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
            case 'RepeatPassword': {
                let RepeatPasswordError = '';
                if (value !== this.signUpData.Password) {
                    RepeatPasswordError = 'These passwords don\'t match';
                }

                if (this.state.RepeatPasswordError === RepeatPasswordError) {
                    this.forceUpdate();
                } else {
                    newState = {RepeatPasswordError};
                }
                break;
            }
            default: throw 'ArgumentException';
        }

        this.setState(newState);
    }
}

export default withStyles(styles)<SignUpProps>(SignUpForm);
