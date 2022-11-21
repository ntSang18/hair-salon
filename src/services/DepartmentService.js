import BaseService from './base';
class DepartmentService extends BaseService {
  get entity() {
    return 'departments';
  }

  async getDepartments() {
    try {
      const res = await this.request().get(`${this.entity}`);
      return res;
    } catch (err) {
      console.log(err);

      return [];
    }
  }

  async createDepartment(department) {
    try {
      const res = await this.request().post(`${this.entity}`, { ...department });
      return res;
    } catch (err) {
      return [];
    }
  }

  async updateDepartment(obj) {
    try {
      const res = await this.request().patch(`${this.entity}/${obj.Id}`, { ...obj });
      return res;
    } catch (err) {
      return [];
    }
  }

  async deleteDepartments(obj) {
    try {
      const res = await this.request().patch(`${this.entity}/deleteDepartments`, { ...obj });
      return res;
    } catch (err) {
      return err;
    }
  }
}

export default new DepartmentService();
