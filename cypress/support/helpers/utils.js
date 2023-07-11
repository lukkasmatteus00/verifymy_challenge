
/**
 * Assemble the JSON that will be sent in the request
 * 
 * @param {*} params 
 * @returns 
 */
export function requestHeaderInfo(params) {

    const { path, payload, acess_token } = new Proxy(params, {
        set(target, key, value) {
            if (key === 'path' && value === undefined) throw new Error('The path must be informed!');

            target[key] = value
        }
    });

    let info = {
        url: `${Cypress.env("serverest")}${path}`,
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        failOnStatusCode: false,
        body: payload
    };

    if (acess_token) info.headers.authorization = acess_token;

    return {
        GET: get,
        POST: post,
        PUT: put,
        DELETE: _delete
    };

    function get() {
        info.method = "GET";
        delete info.body;
        return info;
    }

    function post() {
        info.method = "POST";
        return info;
    }

    function put() {
        info.method = "PUT";
        return info;
    }
    function _delete() {
        info.method = "DELETE";
        return info;
    }
};