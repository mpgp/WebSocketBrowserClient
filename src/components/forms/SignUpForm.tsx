import * as React from 'react';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import MobileStepper from 'material-ui/MobileStepper';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';

import { AvatarSelector } from '../';

export class SignUpData {
    Avatar = '0.jpg';
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
    ActiveStep: number;
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
    private readonly stepsCount = 2;
    private signUpData = new SignUpData();
    private get valid() {
        return !this.state.LoginError && this.signUpData.Login
            && !this.state.PasswordError && this.signUpData.Password
            && !this.state.RepeatPasswordError && this.signUpData.RepeatPassword;
    }

    constructor(props: SignUpFormProps) {
        super(props);

        this.state = {
            ActiveStep: 0,
            LoginError: '',
            PasswordError: '',
            RepeatPasswordError: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleStep = this.handleStep.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onPickAvatar = this.onPickAvatar.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const name = event.target.name as 'Login';
        const value = event.target.value;
        this.signUpData[name] = value;

        this.validate(name, value);
    }

    handleStep(e: React.MouseEvent<HTMLFormElement>) {
        const initialState = {
            LoginError: '',
            PasswordError: '',
            RepeatPasswordError: ''
        };
        if (e.currentTarget.name === 'next') {
            this.setState((prevState) => ({...initialState, ActiveStep: prevState.ActiveStep + 1}));
        } else {
            this.setState((prevState) => {
                if (prevState.ActiveStep === 1) {
                    this.signUpData.Login = '';
                    this.signUpData.Password = '';
                    this.signUpData.RepeatPassword = '';
                }
                return {...initialState, ActiveStep: prevState.ActiveStep - 1};
            });
        }
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const signUpData = {...this.signUpData};
        delete signUpData.RepeatPassword;
        this.props.onSubmit(signUpData);
    }

    getFormBody() {
        switch (this.state.ActiveStep) {
            case 0: return this.getStep0();
            case 1: return this.getStep1();
            default: throw 'NullReferenceException';
        }
    }

    getStep0() {
        const { LoginError, PasswordError, RepeatPasswordError } = this.state;

        return (
            <React.Fragment>
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
            </React.Fragment>
        );
    }

    getStep1() {
        return (
            <React.Fragment>
                <AvatarSelector onPickAvatar={this.onPickAvatar} />
                <Button variant={'raised'} type="submit" color="primary" fullWidth={true} disabled={!this.valid}>
                    Register
                </Button>
            </React.Fragment>
        );
    }

    onPickAvatar(avatar: string) {
        this.signUpData.Avatar = avatar;
    }

    render() {
        const { ActiveStep } = this.state;
        const { classes, errors } = this.props;
        const backButton = (
            <Button size="small" onClick={this.handleStep} disabled={this.state.ActiveStep === 0} name="back">
                <KeyboardArrowLeft />
                Back
            </Button>
        );
        const nextButton = (
            <Button size="small" onClick={this.handleStep} disabled={ActiveStep === this.stepsCount - 1} name="next">
                Next
                <KeyboardArrowRight />
            </Button>
        );

        return (
            <div className={classes.root}>
                <Card className={'SignUpForm ' + classes.Card}>
                    <CardContent>
                        <Typography component="h2" variant="headline" className={classes.Typography}>
                            Sign Up
                        </Typography>
                        <Typography className={classes.Typography}>
                            Step {ActiveStep + 1} of {this.stepsCount}
                        </Typography>
                        <Divider />
                        {errors && errors
                            .map((error: string) => <p key={error}>{error}</p>)}
                        <form onSubmit={this.handleSubmit}>
                            <MobileStepper
                                variant="text"
                                steps={this.stepsCount}
                                position="static"
                                activeStep={ActiveStep}
                                nextButton={(ActiveStep + 1 < this.stepsCount) ? nextButton : <React.Fragment />}
                                backButton={backButton}
                            />
                            {this.getFormBody()}
                        </form>
                    </CardContent>
                    <CardActions>
                        <a href="/">
                            <Button variant={'raised'} color="default">Sign In</Button>
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
                } else if (value !== this.signUpData.RepeatPassword) {
                    PasswordError = 'These passwords don\'t match';
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
                    newState = {PasswordError: ''};
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
