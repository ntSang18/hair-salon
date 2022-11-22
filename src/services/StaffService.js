import BaseService from './base';
class StaffService extends BaseService {
  get entity() {
    return 'staffs';
  }

  async login(obj) {
    try {
      const res = await this.request().post(`${this.entity}/login`, { ...obj });
      return res;
    } catch (err) {
      return { err: err };
    }
  }

  async changePassword(obj) {
    try {
      const id = obj.Id;
      const res = await this.request().patch(`${this.entity}/${id}/password`, { ...obj });
      return res;
    } catch (err) {
      return { err: err };
    }
  }

  async searchStaffs(page, pageSize, name, role) {
    let query = `${this.entity}?`;
    if (page && pageSize) query += `page=${page}&pageSize=${pageSize}`;
    if (name) query += `&name=${name}`;
    if (role) query += `&roleId=${role}`;
    try {
      const res = await this.request().get(query);
      return res;
    } catch (err) {
      return [];
    }
  }

  async getStaffs(page, pageSize) {
    let stn = '';
    if (page) stn += `${this.entity}?page=${page}&pageSize=${pageSize}`;
    else stn = `${this.entity}`;
    try {
      const res = await this.request().get(stn);
      return res;
    } catch (err) {
      return [];
    }
  }

  async getBarbers() {
    try {
      const res = await this.request().get(`${this.entity}?roleId=2`);
      return res;
    } catch (error) {
      return [];
    }
  }

  async getBarberRankings() {
    try {
      const res = await this.request().get(`${this.entity}?roleId=2&orderBy=bills`);
      return res;
    } catch (error) {
      return [];
    }
  }

  async getStaff(id) {
    try {
      const res = await this.request().get(`${this.entity}/${id}`);
      return res;
    } catch (err) {
      return [];
    }
  }

  async createStaff(staff) {
    try {
      const res = await this.request().post(`${this.entity}`, { ...staff });
      return res;
    } catch (err) {
      return err;
    }
  }

  async updateStaff(id, obj) {
    // delete obj.role;
    // delete obj.department;
    try {
      const res = await this.request().patch(`${this.entity}/${id}`, obj);
      return res;
    } catch (err) {
      return [];
    }
  }

  async deleteStaff(id) {
    try {
      const res = await this.request().delete(`${this.entity}/${id}`);
      return res;
    } catch (err) {
      return err;
    }
  }

  async getWage(month, year, role) {
    try {
      let query = `${this.entity}/wages/filter?month=${month}&year=${year}`;
      if (role) query += `&roleId=${role}`;
      const res = await this.request().get(query);
      return res;
    } catch (err) {
      return err;
    }
  }
}

export default new StaffService();
