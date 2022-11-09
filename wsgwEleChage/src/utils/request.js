import instance from "./networkUtils"
/**
 * @param {String} url     请求的url:
 * @param {Object} data    请求的参数
 * @param {Object} config  请求的配置
 * @returns {Promise}     返回一个promise对象，其实就相当于axios请求数据的返回值
 */


const request = (params) => {
    if (params?.data?.ORDER_SOURCE) {
      params.data.ORDER_SOURCE = '07'
    }
    params.data.timestamp = new Date().getTime()
    var finnalParams = {
        "target": "12101",
        "source": "app",
        'serviceCode': '0102150',
        data: params.paramsFlag == '1' ? params.data : {
          "common": {
            "APPVERSION": "1.0",
            "CHANNEL_RESOURCE": "5",
            "REQTYPE": "3",
            "ACCESS_MERCHANT_NO": "1000000022",
            "PLAT": "4",
            "WSGW_PLAT": '8', // 6 微信小程序 7支付宝小程序 8关怀版
            "REQUEST_SOURCE": "10",
            "RISK_CHECK": "1qaz@WSX3edc$RFV"
            // "ENCRYPTTYPE": "0",
          },
          "data": params.data
        }
    }
    
    // 设置开关,paramsFlag : 默认不传该字段，支付中心报文格式，有嵌套; 1 账单中心数据，无嵌套; 2 用户中心数据，入参和返参数是任意内容
    params.data =  params.paramsFlag == '2' ? params.data : finnalParams
    // 设置code成功的编码 codeFlag: 0正常成功编码 为0 ; 1 特殊模式编码 为所传参数
    params.code = params.code === '1' ? '1' : '0'
    // showLoad 是否显示加载,l默认为'0' 如果不传则请求开始之前,都会出现loading.若不需要,则传'1'
    params.showLoad = params.showLoad === '1' ? '1' : '0'
    params.isResponseAll = !!params.isResponseAll
    params.isHideToast = !!params.isHideToast
    //公共数据token,version，统一处理，业务侧不需要传入token,version
    if (params && params.data) {
        params.data.token = window.localStorage.getItem('token')
        params.data.TOKEN = window.localStorage.getItem('token')
        if (params.data.data) {
            params.data.data.TOKEN = window.localStorage.getItem('token')
            params.data.data.token = window.localStorage.getItem('token')
            if (params.data.data.common) {
                params.data.data.common.TOKEN = window.localStorage.getItem('token')
                params.data.data.common.token = window.localStorage.getItem('token')
            }
            if (params.data.data.data) {
                params.data.data.data.TOKEN = window.localStorage.getItem('token')
                params.data.data.data.token = window.localStorage.getItem('token')
            }
        }
    }
    return instance.post(params.url, params.data, {...params})
}

const requestToken = (params) => {
    return instance.post(params.url, params.data, {...params})
}
export {
    request,
    requestToken
}