export default function ({store, route, redirect, app}) {
	
	if (!store.state.isLogin) {
		if (route.path != routerPath.login) {
			return redirect(routerPath.login)
		}
	}else {
		if (route.path == routerPath.login) {
			return redirect(routerPath.home)
		}
	}
	
}