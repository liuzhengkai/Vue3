import instance from "./networkUtils"
/**
 * @param {String} url     请求的url:
 * @param {Object} data    请求的参数
 * @param {Object} config  请求的配置
 * @returns {Promise}     返回一个promise对象，其实就相当于axios请求数据的返回值
 */


const request = (params) => {
    let url = '/api' + params.url
    return instance.post(url, params.data, {...params.config})
}
export default request