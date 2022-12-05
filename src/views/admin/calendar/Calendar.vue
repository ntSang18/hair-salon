<template>
  <div class="container padding-left-right">
    <Title title="Calendar" />
    <FullCalendar class="calendar" :options="calendarOptions" />
  </div>
</template>

<script>
import '@fullcalendar/core/vdom';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Title from '@/components/admin/Title';

export default {
  components: {
    FullCalendar,
    Title,
  },
  data() {
    return {
      leaveEvents: null,
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick,
        events: [],
      },
    };
  },
  mounted() {
    this.getLeave();
  },
  methods: {
    changeFormatLeave(arr) {
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
            // if (element.start === this.today) this.leavesToday += 1;
          }
        }
        return {
          title: item.title + ': ' + len.length,
          id: item.id,
          detail: len,
          start: item.start,
          end: item.end,
          color: item.color,
        };
      });
    },
    getLeave() {
      // await CalendarAdminServices.getCalendar().then(res => {
      //   let off = [];
      //   for (const element of res) {
      //     element.title = 'Days off';
      //     element.color = '#25c9d0';
      //     off.push(element);
      //   }
      let off = [
        {
          id: '4af562b4-1192-4885-99c9-45701d4cc829',
          created_at: '2022-09-16T15:45:23.998321',
          date: '2022-09-29',
          start: '2022-09-29',
          has_veggie: false,
          color: '#25c9d0',
          title: 'Bookings',
        },
        {
          id: '4af562b4-1192-4885-99c9-45701d4cc829',
          created_at: '2022-09-16T15:45:23.998321',
          date: '2022-09-29',
          start: '2022-09-29',
          has_veggie: false,
          color: '#25c9d0',
          title: 'Bookings',
        },
        {
          id: '1',
          created_at: '2022-09-16T15:45:23.998321',
          date: '2022-09-29',
          start: '2022-09-29',
          has_veggie: false,
          color: '#25c9d0',
          title: 'Bookings',
        },
        {
          id: '3',
          created_at: '2022-09-16T15:45:23.998321',
          date: '2022-09-30',
          start: '2022-09-30',
          has_veggie: false,
          color: '#25c9d0',
          title: 'Bookings',
        },
      ];
      this.leaveEvents = this.changeFormatLeave(off);
      this.calendarOptions.events = this.leaveEvents;
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
