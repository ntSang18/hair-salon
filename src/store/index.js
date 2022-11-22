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
    staff: null,
    dateNotify: '',
    customerNotify: '',
  },
  mutations: {
    async deToken(state, data) {
      state.token = data.token;
      state.refreshToken = data.refreshToken;
      state.staff = await verifyJwtToken(data.token);
      sessionStorage.setItem('token', state.token);
      sessionStorage.setItem('refreshToken', state.refreshToken);
      sessionStorage.setItem('staff', JSON.stringify(state.staff));
    },
    clearStore(state) {
      sessionStorage.clear();
      state.token = null;
      state.refreshToken = null;
      state.staff = null;
    },
    setNotify(state, data) {
      state.dateNotify = data.date;
      state.customerNotify = data.customer;
    },
  },
  actions: {
    deToken(content, data) {
      content.commit('deToken', data);
    },
    clearStore(content) {
      content.commit('clearStore');
    },
    setNotify(content, data) {
      content.commit('setNotify', data);
    },
  },
  modules: {},
});
