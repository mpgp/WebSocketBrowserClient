import * as React from 'react';
import * as moment from 'moment';

interface DateTimeViewProps {
    Time: number;
    Mode: DateModes;
}

export enum DateModes {
    Date,
    DateTime,
    Time,
}

const DateTimeView = ({Time, Mode}: DateTimeViewProps) => (
    <span className="date-time-view">
        {moment(Time * 1000).format(
            Mode === DateModes.Date ? 'D.MM.YYYY'
                : Mode === DateModes.DateTime ? 'D.MM.YYYY HH:mm:ss' : 'HH:mm:ss'
        )}
    </span>
);

export { DateTimeView };
