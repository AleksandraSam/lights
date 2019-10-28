import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
Vue.use(Router)

const Red = { template: '<div></div>'}
const Yellow = { template: '<div></div>'}
const Green = { template: '<div></div>'}


const router = new Router({
	routes: [
	{
		path: '/red',
		name:'red',
		component: Red,
	},
	{
		path: '/yellow',
		name:'yellow',
		component: Yellow,
	},
	{
		path: '/green',
		name:'green',
		component: Green,
	}
	]
})

//Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})