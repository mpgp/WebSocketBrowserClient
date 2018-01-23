const sendRequest = (method: string, path: string, body: any) => {
    return fetch(process.env.API_PATH + path, {
        method,
        body: body ? JSON.stringify(body) : null,
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

enum CONTROLLERS {
    Account = 'account',
    Server = 'server',
    // 'room',
    // 'user',
}

const ApiService = { del, get, patch, post, put };
export { CONTROLLERS, ApiService };
