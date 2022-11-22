import BaseService from './base';
class NotificationService extends BaseService {
  get entity() {
    return 'notifications';
  }

  async getNotification(toUser) {
    try {
      let query = `${this.entity}`;
      if (!toUser) query += `?toUser=${0}`;
      else query += `?toUser=${toUser}`;
      const res = await this.request().get(query);
      return res;
    } catch (err) {
      return err;
    }
  }
  async createNotification(obj) {
    try {
      const res = await this.request().post(`${this.entity}`, obj);
      return res;
    } catch (err) {
      return err;
    }
  }
  async createManyNotification(data) {
    try {
      const res = await this.request().post(`${this.entity}/many`, data);
      return res;
    } catch (err) {
      return err;
    }
  }
  async updateNotification(obj) {
    try {
      const res = await this.request().patch(`${this.entity}/${obj.Id}`, obj);
      return res;
    } catch (err) {
      return err;
    }
  }
}

export default new NotificationService();
