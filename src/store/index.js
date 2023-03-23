import { createStore } from 'vuex'
import ModuleUser from './user'

export default createStore({
  // state: 存储所有数据
  state: {
  },
  // getters: 获取state里————不能直接得到，需要做一些计算的内容
  getters: {
  },
  // mutations: 对state所有直接修改的操作都放在这里
  mutations: {
  },
  // actions: 定义对state的各种操作
  actions: {
  },
  // modules: 当state的内容很多，可以放进这里
  modules: {
    user: ModuleUser
  }
})
