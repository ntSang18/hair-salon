import BaseService from './base';
class BillService extends BaseService {
  get entity() {
    return 'bills';
  }

  async saleStaffWithBill(startDate, endDate) {
    let query = `${this.entity}/staffs/sort`;
    if (startDate && endDate) query += `?startDate=${startDate}&endDate=${endDate}`;
    try {
      const res = await this.request().get(query);
      return res;
    } catch (err) {
      return err;
    }
  }

  async getBills(startDate, endDate, page, pageSize) {
    let query = `${this.entity}`;
    if (startDate && endDate) query += `?startDate=${startDate}&endDate=${endDate}`;
    if (page && pageSize) query += `&page=${page}&pageSize=${pageSize}`;
    try {
      const res = await this.request().get(query);
      return res;
    } catch (err) {
      return err;
    }
  }

  async createBill(obj) {
    let query = `${this.entity}/`;
    try {
      const res = await this.request().post(query, obj);
      return res;
    } catch (err) {
      return err;
    }
  }

  async createBillWithBooking(obj) {
    let query = `${this.entity}/booking`;
    try {
      const res = await this.request().post(query, obj);
      return res;
    } catch (err) {
      return err;
    }
  }
}

export default new BillService();
