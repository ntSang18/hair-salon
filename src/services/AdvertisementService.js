import BaseService from './base';
class AdvertisementService extends BaseService {
  get entity() {
    return 'advertisements';
  }

  async getAds() {
    try {
      const res = await this.request().get(`${this.entity}`);
      return res;
    } catch (err) {
      return err;
    }
  }

  async getAd(id) {
    try {
      const res = await this.request().get(`${this.entity}/${id}`);
      return res;
    } catch (err) {
      return err;
    }
  }

  async createAd(obj) {
    try {
      const res = await this.request_service_ad().post(`${this.entity}`, obj);
      return res;
    } catch (err) {
      return err;
    }
  }

  async checkVoucherCode(code) {
    try {
      const res = await this.request_service_ad().get(`${this.entity}/${code}/code`);
      return res;
    } catch (err) {
      return err;
    }
  }

  async checkCoupon(code) {
    try {
      const res = await this.request_heroku().get(`${this.entity}/${code}/code`);
      return res;
    } catch (error) {
      return error;
    }
  }
}
export default new AdvertisementService();
