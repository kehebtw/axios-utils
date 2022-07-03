const axios = require("axios")

const defaultTimeout = 9999 * 1000
const defaultHeaders = {'Content-Type': 'application/json'}

// Add a response interceptor
function successInterceptor(response) {
    return response
}

function errorInterceptor(error) {
    return Promise.resolve({
        ...error.response,
        ok: false,
        error: error.message.toString(),
        status: error.response.status || -1,
    })
}

function getAxiosClient(baseURL, headers = {}, timeout = defaultTimeout){
    let instance = axios.create({
        baseURL, 
        timeout, 
        headers: { ...defaultHeaders, ...headers },
        transformResponse: [function (data) {
            return {
                ok: true,
                status: data.status,
                data: data.data,
                extras: data.headers
            }
        }],
    })
    instance.interceptors.response.use(successInterceptor, errorInterceptor)
    return instance
}


module.exports = {
    defaultTimeout,
    defaultHeaders,
    getAxiosClient
}