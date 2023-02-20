import {createStore} from 'vuex'

export default createStore({
  state: {
    user: {}
  },
  getters: {
    getUser(state) {
      return state.user
    },
    isAuth:state => {
      return state.user.token?true:false
    },
    token:state => {
      return state.user.token?state.user.token:''
    }
  },
  mutations: {
    changeUser(context, args) {
      context.user = args
    }
  },
  actions: {
    changeUser(context, args) {
      context.commit('changeUser',args)
    }
  },
  modules: {}
})
