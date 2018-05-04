import createPersistedState from 'vuex-persistedstate'
// import * as Cookies from 'js-cookie'

export default ({store}) => {
  createPersistedState({
      key: 'shihua-vuex',
      paths:["toolbar","isLogin"],
      storage: window.sessionStorage

      /*cookies*/
      // storage: {
      //   getItem: key => Cookies.get(key),
      //   // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
      //   setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
      //   removeItem: key => Cookies.remove(key)
      // },
  })(store)
}