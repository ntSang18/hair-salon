<template>
  <div class="container padding-left-right">
    <Title title="Appointment" />
    <FullCalendar ref="calendar" class="calendar" :options="calendarOptions" />
    <el-dialog v-model="dialogBooking" width="75%">
      <template #header>
        <span class="header-dialog">Booking</span>
      </template>
      <template #default>
        <div>
          <div style="float: left; margin: 20px 0px 20px 10px">
            <el-select v-model="timeSlot" class="w-75" clearable>
              <el-option v-for="item in timeSlots" :key="item" :label="item" :value="item" />
            </el-select>
          </div>

          <div style="float: right; margin: 20px 10px 20px 0px">
            <el-button
              type="success"
              @click="confirmBooking('Confirm')"
              v-if="dialogTitle == 'Pending' && !buttonDisable"
              >Confirm</el-button
            >
            <el-button
              type="danger"
              v-if="(dialogTitle == 'Pending' || dialogTitle == 'Confirm') && !buttonDisable"
              @click="confirmBooking('Cancel')"
              >Cancel</el-button
            >
          </div>
        </div>
        <div class="cover-table">
          <el-table ref="multipleTableRef" :data="dataTable" border @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column label="Customer">
              <template #default="scope">
                {{ scope.row.customer.name }}
              </template>
            </el-table-column>
            <el-table-column property="phone" label="Phone">
              <template #default="scope">
                {{ scope.row.customer.phone }}
              </template>
            </el-table-column>
            <el-table-column property="staff" label="Staff">
              <template #default="scope">
                {{ scope.row.staff.name }}
              </template>
            </el-table-column>
            <el-table-column label="Time Slot">
              <template #default="scope">
                {{ scope.row.timeSlot }}
              </template>
            </el-table-column>
            <el-table-column property="note" label="Note">
              <template #default="scope">
                {{ scope.row.note }}
              </template>
            </el-table-column>

            <el-table-column property="Voucher" label="Voucher">
              <template #default="scope">
                {{ discount(scope.row.advertisement) }}
              </template>
            </el-table-column>

            <el-table-column property="status" label="Status">
              <template #default="scope">
                {{ scope.row.status }}
              </template>
            </el-table-column>

            <el-table-column property="Detail" label="Detail" width="100">
              <template #default="scope">
                <div class="d-flex justify-content-center">
                  <div class="icon" @click="clickDetail(scope.row.Id)">
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa="">
                      <path
                        fill="#5646ab"
                        d="M832 384H576V128H192v768h640V384zm-26.496-64L640 154.496V320h165.504zM160 64h480l256 256v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32zm160 448h384v64H320v-64zm0-192h160v64H320v-64zm0 384h384v64H320v-64z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column property="Payment" label="Payment" width="100" v-if="dialogTitle == 'Confirm'">
              <template #default="scope">
                <div class="d-flex justify-content-center">
                  <div class="icon" @click="clickBill(scope.row)">
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa="">
                      <path
                        fill="#5646ab"
                        d="M704 288h131.072a32 32 0 0 1 31.808 28.8L886.4 512h-64.384l-16-160H704v96a32 32 0 1 1-64 0v-96H384v96a32 32 0 0 1-64 0v-96H217.92l-51.2 512H512v64H131.328a32 32 0 0 1-31.808-35.2l57.6-576a32 32 0 0 1 31.808-28.8H320v-22.336C320 154.688 405.504 64 512 64s192 90.688 192 201.664v22.4zm-64 0v-22.336C640 189.248 582.272 128 512 128c-70.272 0-128 61.248-128 137.664v22.4h256zm201.408 483.84L768 698.496V928a32 32 0 1 1-64 0V698.496l-73.344 73.344a32 32 0 1 1-45.248-45.248l128-128a32 32 0 0 1 45.248 0l128 128a32 32 0 1 1-45.248 45.248z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column property="Bill" label="Bill" width="100" v-if="dialogTitle == 'Done'">
              <template #default="scope">
                <div class="d-flex justify-content-center">
                  <div class="icon" @click="clickBillDone(scope.row)">
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa="">
                      <path
                        fill="#5646ab"
                        d="M256 768H105.024c-14.272 0-19.456-1.472-24.64-4.288a29.056 29.056 0 0 1-12.16-12.096C65.536 746.432 64 741.248 64 727.04V379.072c0-42.816 4.48-58.304 12.8-73.984 8.384-15.616 20.672-27.904 36.288-36.288 15.68-8.32 31.168-12.8 73.984-12.8H256V64h512v192h68.928c42.816 0 58.304 4.48 73.984 12.8 15.616 8.384 27.904 20.672 36.288 36.288 8.32 15.68 12.8 31.168 12.8 73.984v347.904c0 14.272-1.472 19.456-4.288 24.64a29.056 29.056 0 0 1-12.096 12.16c-5.184 2.752-10.368 4.224-24.64 4.224H768v192H256V768zm64-192v320h384V576H320zm-64 128V512h512v192h128V379.072c0-29.376-1.408-36.48-5.248-43.776a23.296 23.296 0 0 0-10.048-10.048c-7.232-3.84-14.4-5.248-43.776-5.248H187.072c-29.376 0-36.48 1.408-43.776 5.248a23.296 23.296 0 0 0-10.048 10.048c-3.84 7.232-5.248 14.4-5.248 43.776V704h128zm64-448h384V128H320v128zm-64 128h64v64h-64v-64zm128 0h64v64h-64v-64z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-dialog v-model="dialogDetail" width="50%">
          <template #header>
            <span class="header-dialog">Details</span>
          </template>
          <template #default>
            <el-table :data="dataDetail" border>
              <el-table-column label="Service">
                <template #default="scope">
                  {{ scope.row.service.name }}
                </template>
              </el-table-column>
              <el-table-column label="Price">
                <template #default="scope"> {{ convertCurrency(scope.row.service.price) }} </template>
              </el-table-column>
              <el-table-column property="Action" label="Action" width="160">
                <template #default="scope">
                  <div class="d-flex justify-content-center">
                    <div class="icon" @click="updateBooking(scope.row.Id)">
                      <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa="">
                        <path
                          fill="#5646ab"
                          d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-dialog>
        <el-dialog v-model="dialogBill" width="25%">
          <template #default>
            <Bill :booking="bookingBill" @createBillAndUpdateDone="createBillAndUpdateDone" v-if="!watch" />
            <BillDone :booking="bookingBill" v-else />
          </template>
        </el-dialog>
      </template>
      <template #footer> </template>
    </el-dialog>
  </div>
</template>

<script>
import '@fullcalendar/core/vdom';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Title from '@/components/admin/Title';
import BookingService from '@/services/BookingService';
import NotificationService from '@/services/NotificationService';

import { timeSlots } from '@/common/timeSlot';
import Bill from '@/components/admin/Bill';
import BillDone from '@/components/admin/BillDone';
import { database, ref, push } from '@/services/firebase';

export default {
  components: {
    FullCalendar,
    Title,
    Bill,
    BillDone,
  },

  data() {
    return {
      selectDate: null,
      dialogBooking: false,
      dialogDetail: false,
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        eventClick: this.handleEventClick,
        events: [],
        dialogTitle: '',
      },
      doneEvents: null,
      cancelEvents: null,
      pendingEvents: null,
      confirmEvents: null,
      bookings: [],
      pendings: [],
      cancels: [],
      dones: [],
      confirms: [],
      month: null,
      timeSlot: null,
      dataTable: [],
      isArray: [],
      dataDetail: [],
      idChoseBooking: null,
      idChoseDetail: null,
      buttonDisable: false,
      dialogBill: false,

      watch: false,
      bookingBill: null,
      arrayNotify: [],
    };
  },
  computed: {
    timeSlots() {
      return timeSlots;
    },
  },
  watch: {
    timeSlot() {
      this.dataTable = this.selectedEvent.detail.filter(el => {
        return el.timeSlot.includes(this.timeSlot);
      });
    },
  },
  async mounted() {
    this.month = new Date();
    await this.getBookings(this.month);
    this.getEventMonth();
  },

  methods: {
    discount(obj) {
      if (!obj) return '0%';
      else return obj.discount + '%';
    },
    handleEventClick(e) {
      this.selectedEvent = this.calendarOptions.events.find(item => item.id == e.event.id);
      let date = new Date(this.selectedEvent.start);
      let nowDate = new Date();
      this.dataTable = this.selectedEvent.detail;
      this.timeSlot = null;
      this.dialogTitle = this.selectedEvent.status;
      this.dialogBooking = true;
      if (date.getDate() >= nowDate.getDate() && date.getMonth() >= nowDate.getMonth()) {
        this.buttonDisable = false;
      } else this.buttonDisable = true;
    },
    getEventMonth() {
      document.querySelector('.fc-prev-button').addEventListener(
        'click',
        function () {
          this.month = this.$refs.calendar.calendar.currentData.currentDate;
          this.getBookings(this.month);
        }.bind(this),
      );
      document.querySelector('.fc-next-button').addEventListener(
        'click',
        function () {
          this.month = this.$refs.calendar.calendar.currentData.currentDate;
          this.getBookings(this.month);
        }.bind(this),
      );
    },
    async getBookings(month) {
      const startDate = `${month.getFullYear()}-${month.getMonth() + 1}-${1}`;
      const endDate = `${month.getFullYear()}-${month.getMonth() + 1}-${31}`;
      const response = await BookingService.getBookings(startDate, endDate);
      if (response && response.data) this.bookings = response.data.bookings;
      this.bookings = this.changeFormatData(this.bookings);
      this.pendings = this.getBookingToStatus(this.bookings, 'Pending');
      this.cancels = this.getBookingToStatus(this.bookings, 'Cancel');
      this.dones = this.getBookingToStatus(this.bookings, 'Done');
      this.confirms = this.getBookingToStatus(this.bookings, 'Confirm');
      this.pendingEvents = this.changeFormatPending(this.pendings);
      this.doneEvents = this.changeFormatPending(this.dones);
      this.cancelEvents = this.changeFormatPending(this.cancels);
      this.confirmEvents = this.changeFormatPending(this.confirms);
      this.calendarOptions.events = this.pendingEvents.concat(this.confirmEvents, this.doneEvents, this.cancelEvents);
    },
    sortWithTimeSlot(arr) {
      let newArr = arr.amp(el => {
        if (!el.startsWith('0')) return '0' + el;
      });
      return newArr.sort(function () {});
    },

    getBookingToStatus(arr, status) {
      const obj = arr.filter(el => {
        return el.status == status;
      });
      return [...obj];
    },
    changeFormatPending(arr) {
      let dataArr = arr.map(item => {
        return [item.start, item];
      });
      let mapArr = new Map(dataArr);
      let result = [...mapArr.values()];
      return result.map(item => {
        let len = [];
        for (const element of arr) {
          if (item.start === element.start) {
            len.push(element);
          }
        }
        return {
          id: item.Id,
          title: item.status + ': ' + len.length,
          status: item.status,
          detail: len,
          start: item.start,
          end: item.end,
          color: item.color,
        };
      });
    },
    changeFormatData(arr) {
      return arr.map(el => {
        el.start = el.date.slice(0, 10);
        el.end = el.date.slice(0, 10);
        if (el.status == 'Pending') el.color = '#fab005';
        else if (el.status == 'Confirm') el.color = '#37b24d';
        else if (el.status == 'Done') el.color = '#82c91e';
        else if (el.status == 'Cancel') el.color = '#fa5252';
        return { ...el };
      });
    },

    handleSelectionChange(checks) {
      this.isArray = checks.map(el => {
        return el.Id;
      });
      this.arrayNotify = checks;
    },
    async confirmBooking(status) {
      const obj = {
        idArray: this.isArray,
        status: status,
      };
      const response = await BookingService.updateStatusBookings({ ...obj });
      if (response && response.status == '200') {
        this.$store.state.toast.success('Update status successfully!');
        // create Notify
        const data = this.arrayNotify.map(el => {
          return {
            bookingDate: el.date,
            toUser: el.customerId,
            message: `Your booking in ${el.date.slice(0, 10)} is ${status}`,
          };
        });
        await NotificationService.createManyNotification(data);
        // send firebase

        this.arrayNotify.forEach(el => {
          push(ref(database, 'notify-customer'), {
            bookingDate: el.date,
            toUser: el.customerId,
            message: `Your booking in ${el.date.slice(0, 10)} is ${status}`,
          });
        });
      } else {
        this.$store.state.toast.error(response.data);
      }
      this.isArray = [];
      this.getBookings(this.month);
      this.dialogBooking = false;
    },

    clickDetail(id) {
      this.idChoseBooking = id;
      this.dialogDetail = true;
      this.dataDetail = this.dataTable.filter(el => el.Id == id)[0].details;
    },
    async updateBooking(id) {
      this.idChoseDetail = id;
      let booking = this.dataTable.filter(el => el.Id == this.idChoseBooking)[0];
      let obj = { ...booking, serviceDeleteArray: [id] };
      const response = BookingService.updateBooking({ ...obj });
      if (response) {
        this.$store.state.toast.success('Update successfully!');
        this.dataDetail = this.dataDetail.filter(el => el.Id != this.idChoseDetail);
        this.dataTable.details = this.dataDetail;
        this.getBookings(this.month);
      } else this.$store.state.toast.error('Update failed!');
    },
    clickBill(obj) {
      this.bookingBill = null;
      this.watch = false;
      this.bookingBill = obj;
      this.dialogBill = true;
    },
    async clickBillDone(obj) {
      this.bookingBill = null;
      const response = await BookingService.getBillByBooking(obj.Id);
      this.bookingBill = response.data;
      this.watch = true;
      this.dialogBill = true;
    },
    async createBillAndUpdateDone() {
      //close form
      //update status data when close
      await this.getBookings(this.month);
      this.dialogBill = false;
      this.dialogDetail = false;
    },
    convertCurrency(vnd) {
      return vnd.toLocaleString('vi', { style: 'currency', currency: 'VND' });
    },
  },
};
</script>

<style scoped>
.calendar {
  padding: 20px 20px;
  background-color: #fff;
}
</style>
