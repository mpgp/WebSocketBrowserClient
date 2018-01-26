import { REQUEST_STATUS } from '../enums';

export interface RequestStatus {
    errors?: string[];
    status: REQUEST_STATUS;
}
