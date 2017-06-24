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
    timeCount:0,
    post(url, data) {
        let self = this;
        ++self.timeCount;
        console.log(self.timeCount)
        let timer;//定时器
        timer = setTimeout(()=>{
            if(self.timeCount>=3){
                alert('您的网络太慢了，请换个地方再试');
            }else{
                console.log('我虽超时，但是没超过三次，网速一般般');
            }
            
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
            if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
                self.timeCount = 0;//成功后重置请求超时次数
                clearTimeout(timer);// 成功后 证明没超时  直接清除超时设置
                return typeof response.data === 'string'?JSON.parse(response.data):response.data
            }
        }).catch(err => {
            alert(err)
        })
    },
    get(url, params) {

        let self = this;
        let timer;//定时器
        ++self.timeCount;
        timer = setTimeout(()=>{
             if(self.timeCount>=3){
                alert('您的网络太慢了，请换个地方再试');
            }else{
                console.log('我虽超时，但是没超过三次，网速一般般');
            }
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
            if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
                self.timeCount = 0;//成功后重置请求超时次数
                clearTimeout(timer);// 成功后 证明没超时  直接清除超时设置
                return typeof response.data === 'string'?JSON.parse(response.data):response.data
            }
        }).catch(err => {
            alert(err)
        })
    }
}
