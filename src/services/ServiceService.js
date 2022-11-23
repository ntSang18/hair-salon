import BaseService from './base';

class ServiceService extends BaseService {
  get entity() {
    return 'services';
  }

  async getServiceTypes() {
    try {
      const res = await this.request().get(`serviceTypes`);
      return res;
    } catch (error) {
      return [];
    }
  }

  async getServices() {
    try {
      const res = await this.request().get(`${this.entity}`);
      return res;
    } catch (error) {
      return [];
    }
  }

  async getService(id) {
    try {
      const res = await this.request().get(`${this.entity}/${id}`);
      return res;
    } catch (error) {
      return [];
    }
  }
  async createService(service) {
    try {
      const res = await this.request().post(`${this.entity}`, { ...service });
      return res;
    } catch (err) {
      return err.response;
    }
  }
  async updateService(service) {
    try {
      const res = await this.request().patch(`${this.entity}/${service.Id}`, { ...service });
      return res;
    } catch (err) {
      return err.response;
    }
  }
}

export default new ServiceService();
