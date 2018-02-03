import * as React from 'react';
import Reboot from 'material-ui/Reboot';
import orange from 'material-ui/colors/orange';
import purple from 'material-ui/colors/purple';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
    palette: {
        primary: purple,
        secondary: orange,
    },
});

function withRoot(Component: React.ComponentType) {
    function WithRoot(props: object) {
        return (
            <MuiThemeProvider theme={theme}>
                <Reboot />
                <Component {...props} />
            </MuiThemeProvider>
        );
    }

    return WithRoot;
}

export default withRoot;
