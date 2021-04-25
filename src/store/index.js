import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideList: [],
    showContent: false,
    goodsList: [],
    size: 5,
    type: '',
    counterMap: {},
  },
  mutations: {
    storageChange(state, { id, value }) {
      if (state.counterMap[id]) {
        if ((value === -1 && state.counterMap[id] === 1) || value === -Infinity) {
          Vue.delete(state.counterMap, id);
        } else {
          Vue.set(state.counterMap, id, state.counterMap[id] + value);
        }
      } else {
        Vue.set(state.counterMap, id, 1);
      }
      localStorage.setItem('goods', JSON.stringify(state.counterMap));
    },
    setCounterMap(state, map) {
      state.counterMap = map;
    },
    setSideList(state, list) {
      state.sideList = list;
    },
    setShowContent(state, show) {
      state.showContent = show;
    },
    setGoodsList(state, list) {
      state.goodsList = [...state.goodsList, ...list];
    },
    resetGoodsList(state) {
      state.goodsList = [];
    },
    setGoodsType(state, type) {
      state.type = type;
    },
  },
  actions: {
    async getSideList({ commit }, list) {
      commit('setShowContent', false);
      await commit('setSideList', list);
      commit('setShowContent', true);
    },
    async getGoodsList({ state, commit }, options) {
      const { page, sort } = options;
      const type = options.type || state.type;
      const { list, total } = await api.getGoodsList({
        type, page, size: state.size, sort,
      });
      commit('setGoodsList', list);
      commit('setGoodsType', type);
      if (total > state.goodsList.length) {
        return true;
      }
      return false;
    },
  },
  modules: {
  },
});
