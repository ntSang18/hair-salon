import store from '../store/index';

export default function checkMiddleware(to, from, next) {
  store.state.token = store.state.token == null ? sessionStorage.getItem('token') : store.state.token;
  store.state.refreshToken =
    store.state.refreshToken == null ? sessionStorage.getItem('refreshToken') : store.state.refreshToken;
  store.state.staff = store.state.staff == null ? JSON.parse(sessionStorage.getItem('staff')) : store.state.staff;

  if (to.name !== 'Login' && store.state.token == null) return next({ name: 'Login' });
  else if (to.name == 'Error') return next({ name: 'Error' });
  else return next();
}
