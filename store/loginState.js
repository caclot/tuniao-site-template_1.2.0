// src/store/loginState.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    userInfo: {
      name: '未命名',
      avatar: '', // 这里可以设置默认头像
    },
  },
  mutations: {
    stateLogin(state, userInfo) {
      state.isLoggedIn = true;
      state.userInfo.name = userInfo.name;
      state.userInfo.avatar = userInfo.avatar;
    },
    stateLogout(state) {
      state.isLoggedIn = false;
      state.userInfo.name = '未命名';
      state.userInfo.avatar = ''; // 退出登录时清空头像
    },
  },
  actions: {
    stateLogin({ commit }, userInfo) {
      // 登录成功后调用该方法
      commit('stateLogin', userInfo);
    },
    stateLogout({ commit }) {
      // 退出登录后调用该方法
      commit('stateLogout');
    },
  },
  modules: {},
});
