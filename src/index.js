const axios = require("axios")

const defaultTimeout = 9999 * 1000
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
        status: error.response.status || -1,
        error: error.message.toString(),
        extras: error.response.headers
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