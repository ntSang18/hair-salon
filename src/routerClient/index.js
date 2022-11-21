import { createRouter, createWebHistory } from 'vue-router';
import checkMiddleware from './middleware';

// CLIENT
import Client from '@/layouts/HomeClient.vue';
import Home from '@/views/client/Home.vue';
import Booking from '@/views/client/Booking.vue';
import Service from '@/views/client/Service.vue';
import Stylist from '@/views/client/Stylist.vue';
import Contact from '@/views/client/Contact.vue';
import Login from '@/views/client/Login.vue';
import Register from '@/views/client/Register.vue';
import Account from '@/views/client/Account.vue';
import ChangePassword from '@/views/client/ChangePassword.vue';
import BookingHistory from '@/views/client/BookingHistory.vue';

const routes = [
  {
    path: '/salon',
    name: 'Client',
    component: Client,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
        meta: {
          title: 'Home',
        },
      },
      {
        path: '/salon/booking',
        name: 'Booking',
        component: Booking,
        meta: {
          title: 'Booking',
        },
      },
      {
        path: '/salon/services',
        name: 'Service',
        component: Service,
        meta: {
          title: 'Services',
        },
      },
      {
        path: '/salon/stylists',
        name: 'Stylist',
        component: Stylist,
        meta: {
          title: 'Stylists',
        },
      },
      {
        path: '/salon/contact',
        name: 'Contact',
        component: Contact,
        meta: {
          title: 'Contact',
        },
      },
      {
        path: '/salon/login',
        name: 'Login',
        component: Login,
        meta: {
          title: 'Login',
        },
      },
      {
        path: '/salon/account',
        name: 'Account',
        component: Account,
        meta: {
          title: 'Account',
        },
      },
      {
        path: '/salon/change-password',
        name: 'ChangePassword',
        component: ChangePassword,
        meta: {
          title: 'Change Password',
        },
      },
      {
        path: '/salon/register',
        name: 'Register',
        component: Register,
        meta: {
          title: 'Register',
        },
      },
      {
        path: '/salon/booking-history',
        name: 'BookingHistory',
        component: BookingHistory,
        meta: {
          title: 'Booking History',
        },
      },
    ],
  },
];

const routerClient = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});
routerClient.beforeEach(checkMiddleware);

routerClient.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
});

export default routerClient;
