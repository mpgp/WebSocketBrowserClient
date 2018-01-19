import * as React from 'react';

import { Server } from '../../common/interfaces';

const ServerRoom = (props: Server) => (
    <div className='ServerRoom'>
        {props.id} | {props.name} | {props.address} | {props.code}
    </div>
);

export { ServerRoom };
