import BaseService from './base';
class CustomerTypeService extends BaseService {
  get entity() {
    return 'CustomerTypes';
  }

  async getCustomerTypes() {
    try {
      const res = await this.request().get(`${this.entity}`);
      return res;
    } catch (err) {
      return err;
    }
  }
}
export default new CustomerTypeService();
