import { ApiService } from './ApiService';
import { ApiResponse } from '../../common/interfaces';
import { AuthData } from '../../components/forms/AuthForm';
import { TokenValidation, UserToken } from '../../common/interfaces/ApiPayloads/Account';

const controller = 'account';

const auth = (body: AuthData): Promise<ApiResponse<UserToken>> => ApiService.post(controller, body);

const checkToken = (token: string): Promise<number> => ApiService.patch(controller, { Token: token })
    .then((response: ApiResponse<TokenValidation>) => response.data.status);

const register = (body: AuthData): Promise<ApiResponse<UserToken>> => ApiService.put(controller, body);

const AccountService = { auth, checkToken, register };
export { AccountService };
