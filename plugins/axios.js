import axios from 'axios'
// import { sha256 } from 'js-sha256'

// axios 配置
axios.defaults.timeout = 500000
axios.defaults.withCredentials = true

export default function (cxt, inject) {
	var app = cxt.app;

	// http response 拦截器
	axios.interceptors.response.use(
		res => {

		  	var data = res.data;

	        if (data.successFlag) {
	        	switch (data.result) {
					case 'login success':
						app.store.commit('changeLogin',true)
				        app.router.push(app.router.currentRoute.fullPath);
					break;
					case 'logout success':
						app.store.commit('changeLogin',false)
				        app.router.push(routerPath.login);
					break;
				}

	        }else {
	        	switch (data.result) {
					case 'nologin':
						app.store.commit('changeLogin',false)
				        app.router.push(routerPath.login);
					break;
					default:
						console.log(data.msg);
				}
	        }

			return res

	        // 若不是正确的返回code，且已经登录，就抛出错误
			// const err = new Error(data.description)
			// err.data = data
			// err.response = response
			// throw err

		},
		error => {
			if (error) {
				app.router.push(routerPath.error);
			}
			// console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
			return Promise.reject(error)
		}
	)
}



// http request 拦截器
// axios.interceptors.request.use(
//   config => {
//     let nowDate = new Date()
//     let signTime = nowDate.getTime()
//     if (store.state.token != null && store.state.expireTime > nowDate.getTime()) {
//       config.headers.sign_time = signTime
//       config.headers.auth_Code = store.state.authCode
//       config.headers.sign = sha256.hmac(store.state.token, signTime + store.state.authCode)
//     }
//     return config
//   },
//   err => {
//     return Promise.reject(err)
//   }
// )


// export default axios
