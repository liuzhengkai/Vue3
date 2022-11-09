import axios from 'axios'
import {
    ElLoading,
    ElMessage
} from 'element-plus';
let url = '';
let code = '';
let color = '';
let isResponseAll = '';
//创建axios的一个实例 
var instance = axios.create({
    baseURL: '/api', //接口统一域名
    timeout: 6000, //设置超时
    headers: {
        wsgwType: "ios",
        Authorization: "QWERTYDF1BCDADDD6E422A8C0159CB09F4C2C4",
        // Authorization: "QWERTYUIOPLKJHGFDSAZXCVBNM0987654321202020200520",
        secureToken: 'zhongtai',
        version: '6.2.3',
        t: 'QWERTYDF1BCDADDD6E422A8C0159CB09F4C2C4',
        "Content-Type": "application/json" // 默认值
    }
})
let loading;
//正在请求的数量
let requestCount = 0
//显示loading
const showLoading = () => {
    if (requestCount === 0 && !loading) {
        loading = ElLoading.service({
            text: "Loading  ",
            background: 'rgba(0, 0, 0, 0.7)',
            spinner: 'el-icon-loading',
        })
    }
    requestCount++;
}
//隐藏loading
const hideLoading = () => {
    requestCount--
    if (requestCount == 0) {
        loading.close()
    }
}

//请求拦截器 
instance.interceptors.request.use((request) => {
    url = request.url
    code = request.code
    isResponseAll = request.isResponseAll
    color = Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")
    console.log(`%c【${url}入参】：`+ JSON.stringify(request.data),`color:#${color}`)
    showLoading()
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    const token = window.localStorage.getItem('token');
    token && (request.headers.t = token)
    //若请求方式为post，则将data参数转为JSON字符串
    if (request.method === 'POST') {
        request.data = JSON.stringify(request.data);
    }
    return request;
}, (error) =>
// 对请求错误做些什么
Promise.reject(error));

//响应拦截器
instance.interceptors.response.use((response) => {
    hideLoading()
    //响应成功
    console.log(`%c【${url}返参】：`+ JSON.stringify(response.data),`color:#${color}`)

    if (!isResponseAll) {
        if (code == response.code) {
            return response.data.data
        }
    } else {
        // 适用于业务中需要全部参数的情况
        return response.data
    }
    if ((code + "") != response.code) {
        return console.log(response.data.message)
    }
}, (error) => {
    console.log('拦截器结束error',error)
    //响应错误
    return Promise.reject(error);
});


export default instance;