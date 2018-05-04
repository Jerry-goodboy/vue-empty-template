import * as qs from 'qs'

export default () => {
	window.qsWin = qs;
}

// import Vue from 'vue'
// import * as qs from 'qs'

// export default ({ app }, inject) => {
//   // Set `i18n` instance on `app`
//   // This way we can use it in middleware and pages `asyncData`/`fetch`
//   app.qqss = qs
// }