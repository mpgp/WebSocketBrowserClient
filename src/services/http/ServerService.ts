import { ApiService } from './ApiService';
import { ApiResponse, Server } from '../../common/interfaces';

const controller = 'server';

const getServers = (): Promise<Server[]> => ApiService.get(controller)
    .then((response: ApiResponse<Server[]>) => response.data);

const getServer = (code: string): Promise<Server> => ApiService.get(`${controller}/${code}`)
    .then((response: ApiResponse<Server>) => response.data);

const ServerService = { getServers, getServer };
export { ServerService };
