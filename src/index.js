const axios = require("axios")

const defaultTimeout = 999999 * 1000
const defaultHeaders = {'Content-Type': 'application/json'}

// Add a response interceptor
function successInterceptor(response) {
    return {
        ok: true,
        status: response.status,
        data: response.data,
        extras: response.headers
    }
}

function errorInterceptor(error) {
    return Promise.resolve({
        ok: false,
        status: response.status || 0,
        error: error.toString(),
        extras: response.headers
    })
}

function getAxiosClient(baseURL, headers = {}, timeout = defaultTimeout){
    let instance = axios.create({
        baseURL, timeout, headers: { ...defaultHeaders, ...headers }
    })
    instance.interceptors.request.use(successInterceptor, errorInterceptor)
    return instance
}


module.exports = {
    defaultTimeout,
    defaultHeaders,
    getAxiosClient
}