<template>
  <section id="header">
    <router-link to="/salon"><img class="logo" src="@/assets/client/images/logo/5.png" /></router-link>
    <ul id="navbar">
      <li>
        <router-link to="/salon">Home</router-link>
      </li>
      <li>
        <router-link to="/salon/booking">Booking</router-link>
      </li>
      <li>
        <router-link to="/salon/services">Services</router-link>
      </li>
      <li>
        <router-link to="/salon/stylists">Stylists</router-link>
      </li>
      <li>
        <router-link to="/salon/contact">Contact</router-link>
      </li>
      <li v-if="!customer" class="button">
        <router-link class="btn-login" to="/salon/login">Login Now</router-link>
      </li>
      <li v-else class="button">
        <el-dropdown>
          <el-button>
            {{ customer.name }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item><router-link to="/salon/account">Account</router-link></el-dropdown-item>
              <el-dropdown-item
                ><router-link to="/salon/booking-history">Booking history</router-link></el-dropdown-item
              >
              <el-dropdown-item @click="logout()">Log out</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </li>
      <li v-if="customer" class="notification">
        <el-popover placement="bottom" :width="300" trigger="click">
          <template #reference>
            <el-badge :value="countNotifyUnread" :max="10" class="notification-bell">
              <i class="bx bxs-bell"></i>
            </el-badge>
          </template>
          <template #default>
            <div class="list-notify">
              <div
                v-for="(notify, index) in notifications"
                :key="notify.Id"
                class="notify-item"
                @click="changeStatusNotify(index, notify)"
              >
                <div class="notify-message">
                  {{ notify.message }}
                </div>
                <div :class="notify.status ? 'notify-status' : 'notify-status unread'"></div>
              </div>
            </div>
          </template>
        </el-popover>
      </li>
    </ul>
  </section>
</template>

<script>
import { ArrowDown } from '@element-plus/icons-vue';
import { mapActions, mapState } from 'vuex';
import { database, ref, onValue } from '@/services/firebase';
import NotificationService from '@/services/NotificationService';
export default {
  name: 'NavBar',

  data() {
    return {
      notifications: [],
      countNotifyUnread: 0,
    };
  },

  computed: {
    ...mapState(['customer']),
  },
  mounted() {
    this.getNotification();
    this.receiveNotify();
  },
  watch: {
    customer() {
      this.getNotification();
    },
  },

  methods: {
    ...mapActions(['clearStore']),
    logout() {
      this.clearStore();
      this.$router.push('/salon/login');
    },
    async getNotification() {
      const response = await NotificationService.getNotification(this.customer.Id);
      if (response && response.data) {
        this.notifications = response.data;
        this.countNotifyUnread = this.notifications.filter(notify => !notify.status).length;
      }
    },
    async changeStatusNotify(index, obj) {
      if (!obj.status) {
        await NotificationService.updateNotification({ Id: obj.Id, status: 1 });
        this.notifications[index].status = true;
        this.countNotifyUnread--;
      }
    },
    receiveNotify() {
      const idUser = this.customer ? this.customer.Id : -1;
      const list = [];
      onValue(ref(database, 'notify-customer'), data => {
        data.forEach(d => {
          list.push(d.val());
        });
        if (list.reverse()[0].toUser == idUser) {
          this.getNotification();
          this.eventBus.emit('resetBookingConfirmData');
        }
      });
    },
    renderNotify() {
      document.querySelector('.notify').style.display = 'flex';
      setTimeout(() => {
        document.querySelector('.notify').style.display = 'none';
      }, 5000);
    },
  },
  components: { ArrowDown },
};
</script>
