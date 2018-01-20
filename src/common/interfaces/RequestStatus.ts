import { REQUEST_STATUS } from '../enums';

export interface RequestError {
    code: string;
    message: string;
}

export interface RequestStatus {
    errors?: RequestError[];
    status: REQUEST_STATUS;
}
