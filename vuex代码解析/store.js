import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './getters'

//使用vuex
Vue.use(Vuex)

//vuex管理store

//简单store
// const store = new Vuex.Store({
//   state: {
//     count: 0
//   },
//   mutations: {
//     increment (state) {
//       state.count++
//     }
//   },
//   actions: {
//     increment (context) {
//       context.commit('increment')
//     }
//   }
// })


/*
我们的程序足够大时, store 也会变得非常大, 其中的 state, getters, mutations, actions 也会非常大.
因此 Vuex 允许我们将 store 分成几个 modules, 
每个 modules 都有自己的 state, getters, mutations, actions 甚至它自己的 modules.
*/
const store = new Vuex.Store({
	modules: {
		user
	},
	getters
})

export default store
