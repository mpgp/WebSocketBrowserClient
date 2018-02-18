import { ApiService, NotificationService } from '../';
import { AuthData, SignUpData } from '../../components';
import { ApiResponse, TokenValidation, UserToken } from '../../common/interfaces';

const controller = 'account';

const auth = (body: AuthData): Promise<ApiResponse<UserToken>> => ApiService.post(controller, body);

const checkToken = (token: string): Promise<number> => ApiService.patch(controller, { Token: token })
    .then((response: ApiResponse<TokenValidation>) => {
        try {
            return response.data.status;
        } catch (error) {
            console.warn({error, response});
            NotificationService.error({title: 'Oops', message: 'Failed to validate token'});
            return 0;
        }
    });

const register = (body: SignUpData): Promise<ApiResponse<UserToken>> => ApiService.put(controller, body);

const AccountService = { auth, checkToken, register };
export { AccountService };
