<template>
  <div class="w-100 header d-flex align-items-center">
    <div class="container d-flex justify-content-between align-items-center" style="position: relative">
      <router-link to="/bookings" @click="setNotifyData" class="notify">
        <div>New booking are waiting Confirm!</div>
        <div class="d-flex justify-content-around">
          <div style="font-size: 14px">{{ notify.customer }}</div>
          <div style="font-size: 14px">{{ notify.date }}</div>
        </div>
      </router-link>
      <div class="logo">HAIR-SALON</div>
      <TopBar />

      <div>
        <div class="d-flex" style="position: relative; padding: 0px 10px">
          <div class="d-flex justify-content-center">
            <div style="width: 30px" class="d-flex align-item-center" @click="overNotify">
              <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa="">
                <path fill="#fff" d="M512 64a64 64 0 0 1 64 64v64H448v-64a64 64 0 0 1 64-64z"></path>
                <path
                  fill="#fff"
                  d="M256 768h512V448a256 256 0 1 0-512 0v320zm256-640a320 320 0 0 1 320 320v384H192V448a320 320 0 0 1 320-320z"
                ></path>
                <path
                  fill="#fff"
                  d="M96 768h832q32 0 32 32t-32 32H96q-32 0-32-32t32-32zm352 128h128a64 64 0 0 1-128 0z"
                ></path>
              </svg>
            </div>
            <div class="info-notify">
              <router-link
                to="/bookings"
                class="info-notify-item"
                v-for="item in notifications.slice(0, 10)"
                :key="item.Id"
                @mouseover="changeStatusNotify(item)"
              >
                <div>
                  <div>New booking are waiting Confirm!</div>
                  <div class="d-flex justify-content-around">
                    <div style="font-size: 14px">{{ item.name }}</div>
                    <div style="font-size: 14px">{{ item.bookingDate.slice(0, 10) }}</div>
                  </div>
                </div>
                <div
                  v-show="!item.status"
                  style="background-color: #5646ab; border-radius: 50%; width: 10px; height: 10px"
                ></div>
              </router-link>
            </div>
          </div>

          <div style="position: relative">
            <img class="avatar" :src="'http://' + this.$store.state.staff.imagePath" alt="" @click="over" />
            <div class="info-account">
              <div class="name">{{ name }}</div>
              <div style="margin-top: 10px" class="item">
                <router-link :to="'/accounts/' + idAccount" class="title" @click="over">Profile</router-link>
              </div>
              <div class="item">
                <router-link :to="'/staffs/' + idAccount + '/password'" class="title" @click="over"
                  >Change password</router-link
                >
              </div>
              <div class="item">
                <router-link to="/login/" class="title" @click="logout"> Log out</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import TopBar from '@/components/admin/TopBar';
import { database, ref, onValue } from '@/services/firebase';
import NotificationService from '@/services/NotificationService';
export default {
  components: {
    TopBar,
  },
  data() {
    return {
      idAccount: '',
      name: '',
      notify: {
        customer: '',
        date: '',
      },
      list: [],
      notifications: [],
    };
  },
  mounted() {
    this.name = this.$store.state.staff.name;
    this.idAccount = this.$store.state.staff.Id;
    this.receiveNotify(1);
    this.getNotification();
  },
  methods: {
    ...mapActions(['clearStore']),
    over() {
      let display = document.querySelector('.info-account').style.display;
      if (display == 'flex') document.querySelector('.info-account').style.display = 'none';
      else document.querySelector('.info-account').style.display = 'flex';
    },
    overNotify() {
      let display = document.querySelector('.info-notify').style.display;
      if (display == 'flex') document.querySelector('.info-notify').style.display = 'none';
      else document.querySelector('.info-notify').style.display = 'flex';
    },
    logout() {
      this.clearStore();
    },
    async getNotification() {
      const response = await NotificationService.getNotification(0);
      if (response && response.data) {
        this.notifications = response.data;
      }
    },
    async changeStatusNotify(obj) {
      if (!obj.status) {
        await NotificationService.updateNotification({ Id: obj.Id, status: 1 });
        this.notifications = this.notifications.map(el => {
          if (el.Id == obj.Id)
            return {
              ...el,
              status: true,
            };
          return { ...el };
        });
      }
    },
    setNotifyData() {
      this.setNotify({ date: this.notify.date, customer: this.notify.customer });
      this.notify = {
        customer: '',
        date: '',
      };
    },
    receiveNotify(step) {
      let check = step;
      onValue(ref(database, 'notify'), data => {
        data.forEach(d => {
          this.list.push(d.val());
        });
        this.notify.date = this.list.at(-1).date;
        this.notify.customer = this.list.at(-1).customer;
        if (check != 1) {
          this.renderNotify();
          this.getNotification();
        } else check = 0;
      });
    },
    renderNotify() {
      document.querySelector('.notify').style.display = 'flex';
      setTimeout(() => {
        document.querySelector('.notify').style.display = 'none';
      }, 5000);
    },
  },
};
</script>

<style scoped>
.header {
  background-color: #5646ab;
  height: 70px;
  border-radius: 26px;
}
.logo {
  /* height: 40px; */
  width: 180px;
  font-size: 22px;
  font-weight: 700;
  color: white;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid white;
  margin-left: 10px;
}
.info-account {
  display: none;
  position: absolute;
  top: 40px;
  right: 0;
  width: 180px;
  height: 170px;
  background-color: #fff;
  z-index: 10;
  border-radius: 5px;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid #5646ab;
}
.info-notify {
  display: none;
  position: absolute;
  top: 40px;
  right: 50px;
  width: 270px;
  height: 300px;
  border: 1px solid #5646ab;
  background-color: #fff;
  border-radius: 5px;
  z-index: 10;
  padding: 15px 15px;
  flex-direction: column;
  overflow: scroll;
  overflow-x: hidden;
}
.title {
  text-decoration: none !important;
  color: #484e53;
  font-size: 14px;
  line-height: 30px;
}
.name {
  width: 180px;
  height: 40px !important;
  margin-top: 10px;
  text-align: center !important;
  font-size: 20px;
}
.item {
  height: 30px;
  padding-left: 20px;
}
.notify {
  display: none;
  /* display: flex; */
  transition: opacity 1s ease-out;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  background-color: white;
  top: 160%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 340px;
  height: 90px;
  border: 1px solid #dee2e6;
  border-bottom: 6px solid #545a5f;
  color: #fff;
  font-size: 18px;
  z-index: 10;
  border-radius: 5px;
  text-align: center;
  background-color: #845ef7;
  text-decoration: none;
}
.info-notify-item {
  padding: 5px 10px;
  text-decoration: none;
  color: #484e53;
  border-bottom: 1px solid #e9ecef;
  text-align: center;
  height: 80px;
  border-radius: 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  transition-duration: 0.3s;
}
.info-notify-item:hover {
  background-color: #f1f3f5;
  transition-duration: 0.4s;
}
</style>
