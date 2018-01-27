import { ApiService } from './ApiService';
import NotificationService from '../NotificationService';
import { ApiResponse, Server } from '../../common/interfaces';

const controller = 'server';

const getServers = (): Promise<Server[]> => ApiService.get(controller)
    .then((response: ApiResponse<Server[]>) => {
        try {
            return response.data;
        } catch (error) {
            console.warn({error, response});
            NotificationService.error({title: 'getServers', message: 'cqw<br />\r\n\\r\\newqe'});
            return [];
        }
    });

const getServer = (code: string): Promise<Server> => ApiService.get(`${controller}/${code}`)
    .then((response: ApiResponse<Server>) => {
        try {
            return response.data;
        } catch (error) {
            console.warn({error, response});
            NotificationService.error({title: 'getServer', message: 'cqw<br />\r\n\\r\\newqe'});
            return {} as Server;
        }
    });

const ServerService = { getServers, getServer };
export { ServerService };
