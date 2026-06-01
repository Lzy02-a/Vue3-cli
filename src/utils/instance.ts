import axios from 'axios'
const LOCAL_INSTANCE = axios.create({
  // 本地
  baseURL: import.meta.env.VITE_LOCAL_INSTANCE,
  timeout: 10000,
})

const BUILD_INSTANCE = axios.create({
  //线上
  baseURL: import.meta.env.VITE_BUILD_INSTANCE,
})

const RELEASE_INSTANCE = axios.create({
  // 预发
  baseURL: import.meta.env.VITE_RELEASE_INSTANCE,
})

// Token白名单
const WHITE_URL = [
  // import.meta.env.RELEASE_INSTANCE
]

;[LOCAL_INSTANCE, BUILD_INSTANCE, RELEASE_INSTANCE].forEach((instance) => {
  // 添加请求拦截器
  instance.interceptors.request.use(
    function (config) {
      // 在发送请求之前做些什么
      // if (WHITE_URL.includes(instance.defaults.baseURL)) {
      //   // 白名单不需要token
      //   return config
      // }

      // const token = await getToken()

      // if (token) {
      //   if (!config.headers) {
      //     // config.headers = {};
      //   }
      //   config.headers.Authorization = `Bearer ${token}`
      // }

      // return config
      return config
    },
    function (error) {
      // 对请求错误做些什么
      return Promise.reject(error)
    }
  )

  // 添加响应拦截器
  instance.interceptors.response.use(
    function (response) {
      const res = response.data
      //     if (res.code !== 20000) {
      //       Message({
      //         message: res.message,
      //         type: 'error',
      //         duration: 5 * 1000
      //       });
      //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
      //           confirmButtonText: '重新登录',
      //           cancelButtonText: '取消',
      //           type: 'warning'
      //         }).then(() => {
      //           store.dispatch('FedLogOut').then(() => {
      //             location.reload();// 为了重新实例化vue-router对象 避免bug
      //           });
      //         })
      //       }
      //       return Promise.reject('error');
      //     } else {
      //       return response.data;
      //     }
      return response
    },
    function (error) {
      // 超出 2xx 范围的状态码都会触发该函数。
      // 对响应错误做点什么
      return Promise.reject(error)
    }
  )
})
