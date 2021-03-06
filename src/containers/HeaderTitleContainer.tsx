import * as React from 'react';
import { observer } from 'mobx-react';
import Typography from 'material-ui/Typography';

import { AppStore } from '../stores';

@observer
class HeaderTitleContainer extends React.Component<{}, {}> {
    render() {
        return (
            <Typography variant="title" color="inherit" style={{flex: 1}}>
                {AppStore.title}
            </Typography>
        );
    }
}

export default HeaderTitleContainer;
