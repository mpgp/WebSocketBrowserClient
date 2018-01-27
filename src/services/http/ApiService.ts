import NotificationService from '../NotificationService';

const sendRequest = <T>(method: string, path: string, body: T) => {
    return fetch(process.env.REACT_APP_API_PATH + path, {
        method,
        body: body ? JSON.stringify(body) : null,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .catch((error) => {
            console.warn(process);
            console.warn(process.env);
            NotificationService.error({title: 'Oops', message: 'Failed to fetch data'});
            console.warn({
                error,
                msg: 'sendRequest',
                path,
                method,
                body,
            });
        });
};

const get = (path: string) => sendRequest('GET', path, null);
const del = <T>(path: string, body: T) => sendRequest('DELETE', path, body);
const patch = <T>(path: string, body: T) => sendRequest('PATCH', path, body);
const post = <T>(path: string, body: T) => sendRequest('POST', path, body);
const put = <T>(path: string, body: T) => sendRequest('PUT', path, body);

const ApiService = { del, get, patch, post, put };
export { ApiService };
