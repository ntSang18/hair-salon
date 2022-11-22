import BaseService from './base';

class RateService extends BaseService {
  get entity() {
    return 'rates';
  }

  async createRate(rate) {
    try {
      const res = await this.request().post(`${this.entity}`, { ...rate });
      return res;
    } catch (error) {
      return error.response;
    }
  }
}

export default new RateService();
