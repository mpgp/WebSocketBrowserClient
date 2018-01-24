import { ApiService } from './ApiService';

const controller = 'server';

const getServers = () => ApiService.get(controller);
const getServer = (code: string) => ApiService.get(`${controller}/${code}`);

const ServerService = { getServers, getServer };
export { ServerService };
