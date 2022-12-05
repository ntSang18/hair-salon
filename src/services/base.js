import axios from 'axios';
import store from '../store';
import storeClient from '../storeClient';
export default class BaseService {
  constructor() {
    if (!this.entity) {
      throw new Error('Child service class not provide entity');
    }
  }

  request() {
    var header = {
      'Content-Type': 'application/json',
    };
    if (store.state.token != null) {
      header.Authorization = `Bearer ${store.state.token}`;
    }
    if (storeClient.state.token != null) {
      header.Authorization = `Bearer ${storeClient.state.token}`;
    }
    const instance = axios.create({
      // baseURL: 'http://localhost:3001/api/v1/',
      baseURL: process.env.VUE_APP_host_user_service,
      headers: header,
    });
    return instance;
  }

  request_service_ad() {
    var header = {
      'Content-Type': 'application/json',
    };
    if (store.state.token != null) {
      header.Authorization = `Bearer ${store.state.token}`;
    }
    if (storeClient.state.token != null) {
      header.Authorization = `Bearer ${storeClient.state.token}`;
    }
    const instance = axios.create({
      // baseURL: 'http://localhost:3000/api/v1/',
      baseURL: process.env.VUE_APP_host_ad_service,
      headers: header,
    });
    return instance;
  }

  request_heroku() {
    var header = {
      'Content-Type': 'application/json',
    };
    // if (store.state.token != null) {
    //   header.Authorization = `Bearer ${store.state.token}`;
    // }
    // if (storeClient.state.token != null) {
    //   header.Authorization = `Bearer ${storeClient.state.token}`;
    // }
    const instance = axios.create({
      baseURL: 'https://pbl6-ads-service.herokuapp.com/api/v1/',
      headers: header,
    });
    return instance;
  }
}
