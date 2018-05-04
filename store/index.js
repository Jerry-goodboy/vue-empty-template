/*
Nuxt.js lets you have a store directory with every file corresponding to a module.
If you want this option, export the state as a function, 
and the mutations and actions as objects in store/index.js instead of a store instance:
*/
export const state = () => ({
	isLogin:false
})

export const mutations = {
	changeLogin (state, data) {
		state.isLogin = data
	}
}
