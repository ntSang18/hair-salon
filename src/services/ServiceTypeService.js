import BaseService from './base';

class ServiceTypeService extends BaseService {
  get entity() {
    return 'serviceTypes';
  }

  async getServiceTypes() {
    try {
      const res = await this.request().get(`${this.entity}`);
      return res;
    } catch (error) {
      return error;
    }
  }

  async getServiceType(id) {
    try {
      const res = await this.request().get(`${this.entity}/${id}`);
      return res;
    } catch (error) {
      return error;
    }
  }
  async createServiceType(obj) {
    try {
      const res = await this.request().post(`${this.entity}`, { ...obj });
      return res;
    } catch (error) {
      return error;
    }
  }
}

export default new ServiceTypeService();
