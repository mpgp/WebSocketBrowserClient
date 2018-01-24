import { ApiService } from './ApiService';

const controller = 'account';

const auth = (body: any) => ApiService.post(controller, body);
const checkToken = (body: any) => ApiService.patch(controller, body);
const register = (body: any) => ApiService.put(controller, body);

const AccountService = { auth, checkToken, register };
export { AccountService };
