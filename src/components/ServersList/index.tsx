import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { Server, Servers } from '../../common/interfaces';

const ServerItem =  (props: Server) => (
    <div className='Server'>
        <NavLink to={'/server/' + props.code} title={props.address}>{props.name}</NavLink>
    </div>
);

const ServersList = (props: Servers) => (
    <div className='ServersList'>
        {props.servers.map((serverProps) => <ServerItem key={serverProps.id} {...serverProps}/>)}
    </div>
);

export { ServersList };
