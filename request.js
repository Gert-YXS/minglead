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


