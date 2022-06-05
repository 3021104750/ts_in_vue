import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const CATEGORY = {
  namespaced: true,
  state: {
    formList: [], // 所有添加的事项信息
    type: {
      life: [], // life分类的事项信息
      work: [] // work分类的事项信息
    }
  },

  mutations: {
    // 获取并且存储事项
    getFormList(state: any, value: Record<string, unknown>) {
      let { ...deepValue } = value;
      state.formList.push(deepValue);
      state.type[value.category as string].push(deepValue);
    },

    // 删除事项
    removeList(state: any, value: Record<string, unknown>) {
      state.formList.some((item: Record<string, unknown>, index: number) => {
        if (item.id === value.id) {
          state.formList.splice(index, 1);
        }
      });

      state.type[value.category as string].some((item: Record<string, unknown>, index: number) => {
        if (item.id === value.id) {
          state.type[value.category as string].splice(index, 1);
        }
      });
    }

  }
};

export default new Vuex.Store({
  modules: {
    CATEGORY
  }
});
