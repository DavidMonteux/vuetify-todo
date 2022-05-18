import Vue			from 'vue'
import VueRouter	from 'vue-router'
import goTo			from 'vuetify/lib/services/goto'

import TodoView		from '../views/TodoView.vue'



Vue.use(VueRouter)


const routes = [
	{ path: "/", name: "A faire", component: TodoView },
	{
		path: "/about",
		name: "A propos",
		component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
	}
]

const router = new VueRouter({
	mode: "history",
	routes
})


router.beforeEach((to, from, next) => {

	console.log("- beforeEach -")
	// console.log(to)

	document.title = `${ process.env.VUE_APP_TITLE } - ${ to.name }`


	next()

})

router.afterEach((to, from, next) => {

	console.log("- afterEach -")
	// console.log(to)

	goTo(0, { duration: 0 })

})


export default router
