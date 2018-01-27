import * as React from 'react';
import { NavLink } from 'react-router-dom';
import StarIcon from 'material-ui-icons/Star';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemIcon } from 'material-ui/List';

import { Server, Servers } from '../../common/interfaces';

const ServersList = (props: Servers) => (
    <List style={{width: '300px'}}>
        {props.servers.map((server: Server) => (
            <ListItem button={true} key={server.id} style={{padding: 0}}>
                <NavLink to={'/server/' + server.code} title={server.address} style={{display: 'block', width: '100%'}}>
                    <Typography component="p" type="headline">
                        {server.name}
                        &nbsp;
                        {server.id === 1 && <ListItemIcon>
                            <StarIcon />
                        </ListItemIcon>}
                    </Typography>
                </NavLink>
            </ListItem>
        ))}
    </List>
);

export { ServersList };
