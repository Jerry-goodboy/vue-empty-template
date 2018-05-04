const pkg = require('./package')

module.exports = {
  mode: 'spa',

  router: {
    middleware: 'loginState'
  },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/reset.css',
    'element-ui/lib/theme-chalk/index.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui'
    ,'@/plugins/api'
    ,'@/plugins/qs'
    ,'@/plugins/lodash'
    ,{ src: '@/plugins/vuex-persistedstate.js', ssr: false }
    ,'@/plugins/axios'
  ],

  /*
  ** Nuxt.js modules
  */
  // modules: [
  //   // Doc: https://github.com/nuxt-community/axios-module#usage
  //   '@nuxtjs/axios'    
  // ],

  /*
  ** Axios module configuration
  */
  // axios: {
  //   // See https://github.com/nuxt-community/axios-module#options
  //   withCredentials: true ,
  //   credentials: true //,//Adds an interceptor to automatically set withCredentials config of axios when requesting to baseUrl which allows passing authentication headers to backend.
  //   // proxy: true // Can be also an object with default options
  // },

  // proxy: {
  //   '/api/': { target: 'http://localhost:8080', pathRewrite: {'^/api/': '^/api/'} },
  //   '/api2/': 'http://192.168.19.77:8080'
  // },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: ['axios', 'element-ui', 'qs']
  }
}
