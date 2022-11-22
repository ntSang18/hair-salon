import BaseService from './base';
import dateToString from '../utils/dateToString';
class BookingService extends BaseService {
  get entity() {
    return 'bookings';
  }
  // date : YYYY-MM-DD
  async getBookings(startDate, endDate, page, pageSize) {
    if (!startDate) startDate = dateToString(startDate);
    if (!endDate) endDate = dateToString(endDate);
    let api;
    if (page) api = `${this.entity}?startDate=${startDate}&endDate=${endDate}&page=${page}&pageSize=${pageSize}`;
    else api = `${this.entity}?startDate=${startDate}&endDate=${endDate}`;
    try {
      const res = await this.request().get(api);
      return res;
    } catch (err) {
      return [];
    }
  }

  async getBookingsByDateAndStaff(date, staffId, status) {
    try {
      let api = `${this.entity}?date=${date}&staffId=${staffId}&status=${status}`;
      const res = await this.request().get(api);
      return res;
    } catch (error) {
      return [];
    }
  }

  async getBookingHistory(customerId, page, pageSize) {
    try {
      let api = `${this.entity}?customerId=${customerId}&page=${page}&pageSize=${pageSize}&isDeleted=false`;
      const res = await this.request().get(api);
      return res;
    } catch (error) {
      return [];
    }
  }

  async getBookingsConfirmed(customerId) {
    try {
      let api = `${this.entity}?customerId=${customerId}&status=confirm`;
      const res = await this.request().get(api);
      return res;
    } catch (error) {
      return [];
    }
  }

  async getBooking(id) {
    try {
      const res = await this.request().get(`${this.entity}/${id}`);
      return res;
    } catch (err) {
      return [];
    }
  }

  async getBookingByStaff(idStaff, startDate, endDate) {
    if (startDate) startDate = dateToString(startDate);
    else startDate = dateToString(new Date());
    if (endDate) endDate = dateToString(endDate);
    else endDate = dateToString(new Date());
    try {
      const res = await this.request().get(
        `${this.entity}?staffId=${idStaff}&startDate=${startDate}&endDate=${endDate}`,
      );
      return res;
    } catch (err) {
      return [];
    }
  }

  async createBooking(Booking) {
    try {
      const res = await this.request().post(`${this.entity}`, { ...Booking });
      return res;
    } catch (err) {
      return err.response;
    }
  }

  async updateBooking(obj) {
    try {
      const res = await this.request().patch(`${this.entity}/${obj.Id}`, { ...obj });
      return res;
    } catch (err) {
      return err.response;
    }
  }

  async updateStatusBookings(obj) {
    try {
      const res = await this.request().patch(`${this.entity}`, { ...obj });
      return res;
    } catch (err) {
      return err.response;
    }
  }

  async softDeleteBooking(id) {
    try {
      const res = await this.request().delete(`${this.entity}/${id}/softdelete`);
      return res;
    } catch (error) {
      return error.response;
    }
  }

  async deleteBooking(id) {
    try {
      const res = await this.request().delete(`${this.entity}/${id}`);
      return res;
    } catch (err) {
      return err.response;
    }
  }
  async getBillByBooking(id) {
    try {
      const res = await this.request().get(`${this.entity}/${id}/bill`);
      return res;
    } catch (err) {
      return err.response;
    }
  }
}

export default new BookingService();
