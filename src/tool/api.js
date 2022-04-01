import axios from "axios";
//单独引入Message，因为这里不支持this.$message
import QS from 'qs'; // 引入qs模块
import {ElMessage} from "element-plus";

axios.defaults.timeout = 10000;
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;';

//请求拦截器
axios.interceptors.request.use(config=>{
    console.log("触发请求拦截器")
    if(window.sessionStorage.getItem('token'))
    {
        config.headers['Authorization'] = window.sessionStorage.getItem('token')
    }
    return config
},error => {
    console.log(error)
})
//响应拦截器
axios.interceptors.response.use(response=> {
//    业务逻辑错误
    if(response.status === 200)
    {
        if (response.status === 200) {
            return Promise.resolve(response);
        }
        ElMessage({
            message: response.data.message,
            type: 'warning',
        })
    }else {
        return Promise.reject(response);
    }
},error => {
    ElMessage({
        message: error.message,
        type: 'error',
    })
})
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function postReques1(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err =>{
                reject(err.data)
            })
    });
}
export const postRequest = (url, params) =>{
    return axios({
        method:'post',
        url:url,
        data:params
    })
}
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function getRequest(url, params){
    return new Promise((resolve, reject) =>{
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data)
        })
    });}
