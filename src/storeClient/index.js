import { createStore } from 'vuex';
import { useToast } from 'vue-toastification';
import verifyJwtToken from '@/utils/deToken';

// import createPersistedState from 'vuex-persistedstate';
// import Cookies from 'js-cookie';

const toast = useToast();
export default createStore({
  // plugins: [createPersistedState()],
  state: {
    toast: toast,
    token: null,
    refreshToken: null,
    customer: null,
  },
  mutations: {
    async deToken(state, data) {
      state.token = data.token;
      state.refreshToken = data.refreshToken;
      state.customer = await verifyJwtToken(data.token);
      sessionStorage.setItem('token', state.token);
      sessionStorage.setItem('refreshToken', state.refreshToken);
      sessionStorage.setItem('customer', JSON.stringify(state.customer));
    },
    updateCustomer(state, data) {
      state.customer = data;
      sessionStorage.setItem('customer', JSON.stringify(state.customer));
    },
    clearStore(state) {
      sessionStorage.clear();
      state.token = null;
      state.refreshToken = null;
      state.customer = null;
    },
  },
  actions: {
    deToken(content, data) {
      content.commit('deToken', data);
    },
    updateCustomer(content, data) {
      content.commit('updateCustomer', data);
    },
    clearStore(content) {
      content.commit('clearStore');
    },
  },
  modules: {},
});
