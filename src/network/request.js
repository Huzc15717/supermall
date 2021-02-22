import axios from 'axios'

//****************************************************其实为了更好的可用性，封装这个第三方插件的时候，最好是连配置信息也封装起来，这样后期更换插件时更改的内容会少一些***************************************************
//如果更换后的请求插件不支持Promise，则需要返回Promise，在里面处理插件对应的请求成功，请求失败

export function request(config) {
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000',
        timeout: 5000
    })

    //axios拦截器,此处定义的是局部，也可定义全局
    //请求拦截器
    instance.interceptors.request.use(config => {
        //console.log(config);
        //1、拦截config信息中不符合服务器的要求
        //2、可以在此处做网络请求中图片的显示和消失，每次请求前就显示
        //3、携带token，hearder中相关信息等
        return config
    }, err => {
        //console.log(err)
    })
    //返回拦截器
    instance.interceptors.response.use(res=>{
        console.log(res)
        return res.data
    },err=>{
        console.log(err)
    })

    return instance(config);//最精简的写法，可以直接在调用的地方后面接着写Then、catch，但是需要第三方组件支持Promise，这样就不需要再传入成功和失败的回调方法
}