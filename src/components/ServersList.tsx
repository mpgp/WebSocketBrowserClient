import * as React from 'react';
import { NavLink } from 'react-router-dom';
import StarIcon from 'material-ui-icons/Star';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemIcon } from 'material-ui/List';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';

import { Server, Servers } from '../common/interfaces';

type ServersListProps = Servers & WithStyles<'root' | 'ListItem' | 'NavLink'>;

const styles: StyleRulesCallback<'root'> = () => ({
    root: {width: '300px'},
    ListItem: {padding: 0},
    NavLink: {display: 'block', width: '100%'}
});

const ServersList = ({classes, servers}: ServersListProps) => (
    <List className={classes.root}>
        {servers.map((server: Server) => (
            <ListItem button={true} key={server.id} className={classes.ListItem}>
                <NavLink to={'/server/' + server.code} title={server.address} className={classes.NavLink}>
                    <Typography component="p" variant="headline">
                        {server.name} {server.id === 1 && <ListItemIcon><StarIcon /></ListItemIcon>}
                    </Typography>
                </NavLink>
            </ListItem>
        ))}
    </List>
);

export default withStyles(styles)<Servers>(ServersList);
