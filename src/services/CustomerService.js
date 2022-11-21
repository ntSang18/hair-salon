import BaseService from './base';
class CustomerService extends BaseService {
  get entity() {
    return 'customers';
  }

  async login(obj) {
    try {
      const res = await this.request().post(`${this.entity}/login`, { ...obj });
      return res;
    } catch (err) {
      return { err: err };
    }
  }

  async register(obj) {
    try {
      const res = await this.request().post(`${this.entity}/register`, { ...obj });
      return res;
    } catch (err) {
      return { err: err };
    }
  }

  async changePassword(obj) {
    try {
      const res = await this.request().patch(`${this.entity}/${obj.Id}/password`, { ...obj });
      return res;
    } catch (err) {
      return { err: err };
    }
  }

  async searchCustomers(page, pageSize, name = '', customerTypeId = '') {
    try {
      let query = `${this.entity}?name=${name}&customerTypeId=${customerTypeId}`;
      if (page && pageSize) query += `&page=${page}&pageSize=${pageSize}`;
      const res = await this.request().get(query);
      return res;
    } catch (err) {
      return [];
    }
  }

  async getNewCustomers() {
    try {
      const res = await this.request().get(`${this.entity}?orderBy=new`);
      return res;
    } catch (err) {
      return [];
    }
  }

  async getCustomers() {
    try {
      const res = await this.request().get(`${this.entity}`);
      return res;
    } catch (err) {
      return [];
    }
  }

  async getCustomer(id) {
    try {
      const res = await this.request().get(`${this.entity}/${id}`);
      return res;
    } catch (err) {
      return [];
    }
  }

  async createCustomer(Customer) {
    try {
      const res = await this.request().post(`${this.entity}`, { ...Customer });
      return res;
    } catch (err) {
      return [];
    }
  }

  async updateCustomer(Id, obj) {
    try {
      const res = await this.request().patch(`${this.entity}/${Id}`, obj);
      return res;
    } catch (err) {
      return [];
    }
  }

  async deleteCustomer(id) {
    try {
      const res = await this.request().delete(`${this.entity}/${id}`);
      return res;
    } catch (err) {
      return err;
    }
  }
}

export default new CustomerService();
