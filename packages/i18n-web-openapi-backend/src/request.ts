import { OpenAPIResponse } from './interface';

function parseJSON(response: any) {
    return response.json();
}
  
function checkStatus(response: Response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
  
    const error: any = new Error(response.statusText);
    error.response = response;
    throw error;
}
  
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
function request(url: string, options: RequestInit) {
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON)
        .then(data => ({ data }))
        .catch(err => ({ err }));
}

/**
 * post请求
 * @param url 
 * @param payload 
 */
function _post(url: string, payload: { [key: string]: any }) {
    const headers: any = {};
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    
    const formBody: string = Object.keys(payload)
    .map((key: string) => `${encodeURIComponent(key)}=${encodeURIComponent(payload[key])}`)
    .join('&');

    return request(url, {
        method: 'POST',
        headers,
        body: formBody,
        credentials: 'omit'
    });
}

/**
 * post请求
 * @param url 
 * @param payload 
 */
export async function post<T>(url: string, payload: { [key: string]: any }): Promise<T> {
    const { data, err }: { data?: OpenAPIResponse<T>, err?: any } = await _post(url, payload);
    if (err) {
        throw err;
    }

    if (data && data.code === 0) {
        return data.data;
    } else {
        throw new Error(data?.message);
    }
}