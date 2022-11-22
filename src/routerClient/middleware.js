import store from '../storeClient/index';

export default function checkMiddleware(to, from, next) {
  store.state.token = store.state.token == null ? sessionStorage.getItem('token') : store.state.token;
  store.state.refreshToken =
    store.state.refreshToken == null ? sessionStorage.getItem('refreshToken') : store.state.refreshToken;
  store.state.customer =
    store.state.customer == null ? JSON.parse(sessionStorage.getItem('customer')) : store.state.customer;

  if ((to.name === 'Booking' || to.name === 'BookingHistory' || to.name === 'Account') && store.state.token == null)
    return next({ name: 'Login' });
  else if ((to.name === 'Login' || to.name === 'Register') && store.state.token != null) {
    return next({ name: 'Home' });
  } else return next();
}
