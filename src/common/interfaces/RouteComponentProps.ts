import * as H from 'history';
import { match } from 'react-router';

export interface RouteComponentProps<P> {
    match: match<P>;
    location: H.Location;
    history: H.History;
    staticContext?: object;
}
