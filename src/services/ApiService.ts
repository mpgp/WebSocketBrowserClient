const sendRequest = (method: string, path: string, body: any) => {
    return fetch(process.env.API_PATH + path, {
        method,
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .catch((error) => console.error(error));
};

const get = (path: string) => sendRequest('GET', path, null);
const del = (path: string, body: any) => sendRequest('DELETE', path, body);
const patch = (path: string, body: any) => sendRequest('PATCH', path, body);
const post = (path: string, body: any) => sendRequest('POST', path, body);
const put = (path: string, body: any) => sendRequest('PUT', path, body);

const CONTROLLERS_LIST = [
    'account',
    // 'server',
    // 'room',
    // 'user',
];

const CONTROLLERS = CONTROLLERS_LIST.reduce((prev: any, next: string) => {
    prev[next] = next;
    return prev;
}, {});
const ApiService = { del, get, patch, post, put };
export { CONTROLLERS, ApiService };
