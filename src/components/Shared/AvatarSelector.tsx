import * as React from 'react';
import Paper from 'material-ui/Paper';
import MobileStepper from 'material-ui/MobileStepper';
import Button from 'material-ui/Button';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';

interface AvatarSelectorProps {
    onPickAvatar: (avatar: string) => void;
}
interface AvatarSelectorState {
    ActiveStep: number;
    Avatar: number;
}

class AvatarSelector extends React.PureComponent<AvatarSelectorProps, AvatarSelectorState> {
    private imagesPerPage = 20;
    private imagesPages = 5;

    constructor(props: AvatarSelectorProps) {
        super(props);
        this.handleStep = this.handleStep.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            ActiveStep: 0,
            Avatar: 0
        };
    }

    handleClick(e: React.MouseEvent<HTMLImageElement>) {
        this.setState({Avatar: +e.currentTarget.alt});
        this.props.onPickAvatar(e.currentTarget.alt + '.jpg');
    }

    handleStep(e: React.MouseEvent<HTMLFormElement>) {
        if (e.currentTarget.name === 'next') {
            this.setState((prevState) => ({ActiveStep: prevState.ActiveStep + 1}));
        } else {
            this.setState((prevState) => ({ActiveStep: prevState.ActiveStep - 1}));
        }
        this.setState((prevState) => {
            const Avatar = prevState.ActiveStep * this.imagesPerPage;
            this.props.onPickAvatar(Avatar + '.jpg');
            return {Avatar};
        });
    }

    render() {
        const { ActiveStep, Avatar } = this.state;
        const backButton = (
            <Button size="small" onClick={this.handleStep} disabled={this.state.ActiveStep === 0} name="back">
                <KeyboardArrowLeft />
                Back
            </Button>
        );
        const nextButton = (
            <Button size="small" onClick={this.handleStep} disabled={ActiveStep === this.imagesPages - 1} name="next">
                Next
                <KeyboardArrowRight />
            </Button>
        );
        const imgStyle = {borderRadius: '7px', border: '3px solid #00f'};
        const imgPath = `${process.env.REACT_APP_APP_URL}images/avatars/`;

        return (
            <React.Fragment>
                <Paper style={{textAlign: 'center', padding: '10px 0 5px', cursor: 'pointer'}}>
                    {
                        Array.from(Array(20).keys())
                            .map(i => (
                                <img
                                    alt={(ActiveStep * this.imagesPerPage + i).toString()}
                                    onClick={this.handleClick}
                                    key={ActiveStep * this.imagesPerPage + i}
                                    src={`${imgPath}${ActiveStep * this.imagesPerPage + i}.jpg`}
                                    height="50"
                                    width="50"
                                    style={ActiveStep * this.imagesPerPage + i === Avatar ? imgStyle : {}}
                                />))
                    }
                </Paper>
                <MobileStepper
                    variant="dots"
                    steps={this.imagesPages}
                    position="static"
                    activeStep={ActiveStep}
                    nextButton={nextButton}
                    backButton={backButton}
                />
            </React.Fragment>
        );
    }
}

export default AvatarSelector;
