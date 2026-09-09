// Vuex 4+ 在当前 TypeScript 配置下可能因为 package.json exports 导致声明解析异常，
// 这里忽略该模块声明错误并保留本地补充声明。
// @ts-ignore
import { createStore } from 'vuex'

// 定义 State 类型
interface State {
  user: { name: string } | null
}

export default createStore<State>({
  state: {
    user: null,
  },
  mutations: {
    SET_USER(state: State, user: { name: string }) {
      state.user = user
    },
    CLEAR_USER(state: State) {
      state.user = null
    }
  },
  actions: {
    login(
      { commit }: { commit: (type: string, user: { name: string }) => void },
      user: { name: string }
    ) {
      commit('SET_USER', user)
    },
    logout({ commit }: { commit: (type: string) => void }) {
      commit('CLEAR_USER')
    }
  },
  getters: {
    isLoggedIn: (state: State) => !!state.user,
    getUser: (state: State) => state.user
  }
})