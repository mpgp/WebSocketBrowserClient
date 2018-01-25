import { ApiService } from './ApiService';
import { ApiResponse, Server } from '../../common/interfaces';

const controller = 'server';

const getServers = (): Promise<ApiResponse<Server[]>> => ApiService.get(controller);
const getServer = (code: string): Promise<ApiResponse<Server>> => ApiService.get(`${controller}/${code}`);

const ServerService = { getServers, getServer };
export { ServerService };
