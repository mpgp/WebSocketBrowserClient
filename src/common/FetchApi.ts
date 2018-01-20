const sendRequest = (method: string, path: string, body: any) => {
    return fetch(`http://localhost:5000/api/${path}`, {
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

const FetchApi = {del, get, patch, post, put};
export default FetchApi;
