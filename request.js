import axios from 'axios'
import qs from 'qs'

//拦截器
axios.interceptors.request.use(config => { //在请求发出之前进行一些操作
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {//在这里对返回的数据进行处理
    return response
}, error => {
    return Promise.resolve(error.response)
})


export default {
    timeout:10000,//设置超时时间
    post(url, data) {

        var self = this;
        let timer;//定时器
        timer = setTimeout(()=>{
            alert('请求超时');
        },self.timeout);

        return axios({
            method: 'post',
            baseURL: '/',
            url,
            data: qs.stringify(data),//参数序列化
            timeout: self.timeout,//设置10s超时
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(response => {
            clearTimeout(timer);// 成功后 证明没超时  直接清除超时设置
            if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
                if (typeof response.data === 'string') {
                    return JSON.parse(response.data)
                }else{
                    return response.data
                }
            }
        }).catch(err => {
            alert(err)
        })
    },
    get(url, params) {

        var self = this;
        let timer;//定时器
        timer = setTimeout(()=>{
            alert('请求超时');
        },self.timeout);

        return axios({
            method: 'get',
            baseURL: '/',
            url,
            params, // get 请求时带的参数
            timeout: self.timeout,//设置10s超时
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(response => {
            clearTimeout(timer);// 成功后 证明没超时  直接清除超时设置
            if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
                if (typeof response.data === 'string') {
                    return JSON.parse(response.data)
                }else{
                    return response.data
                }
            }
        }).catch(err => {
            alert(err)
        })
    }
}
