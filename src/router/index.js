import { createRouter, createWebHistory } from 'vue-router';
import checkMiddleware from './middleware';

// ADMIN
import HomeAdmin from '@/layouts/HomeAdmin.vue';
import Booking from '@/views/admin/booking/Booking.vue';
import MyBooking from '@/views/admin/booking/MyBooking.vue';

import Account from '@/views/admin/employee/Account.vue';
import DetailAccount from '@/views/admin/employee/DetailAccount.vue';

import Login from '@/views/admin/login/Login.vue';
import ChangePassword from '@/views/admin/login/ChangePassword.vue';
import Department from '@/views/admin/employee/Department.vue';
import Customer from '@/views/admin/employee/Customer.vue';

import Service from '@/views/admin/service/Service';
import ServiceType from '@/views/admin/service/ServiceType';
import DetailService from '@/views/admin/service/DetailService';

import Sales from '@/views/admin/sales/Sales';
import Salary from '@/views/admin/salary/Salary';

// import Error from '@/views/admin/error/Error';
// import Discount from '@/views/admin/discount/Discount';
// import Payment from '@/views/admin/payment/Payment';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login',
    },
  },
  {
    path: '/',
    name: 'HomeAdmin',
    component: HomeAdmin,
    meta: {
      title: 'Home',
    },
    children: [
      {
        path: '/accounts',
        component: Account,
        meta: {
          title: 'Account',
        },
        children: [],
      },
      {
        path: '/accounts/:id',
        component: DetailAccount,
        meta: {
          title: 'Profile',
        },
      },
      {
        path: '/bookings',
        component: Booking,
        meta: {
          title: 'Booking',
        },
      },
      {
        path: '/departments',
        component: Department,
        meta: {
          title: 'Department',
        },
      },
      {
        path: '/customers',
        component: Customer,
        meta: {
          title: 'Customer',
        },
      },
      {
        path: '/services',
        component: Service,
        meta: {
          title: 'Service',
        },
      },
      {
        path: '/services/:id',
        component: DetailService,
        meta: {
          title: 'DetailService',
        },
      },
      {
        path: '/serviceTypes/:id',
        component: ServiceType,
        meta: {
          title: 'ServiceType',
        },
      },
      //   {
      //     path: '/discounts',
      //     component: Discount,
      //     meta: {
      //       title: 'Discount',
      //     },
      //   },
      //   {
      //     path: '/:pathMatch(.*)*',
      //     component: Error,
      //     name: 'Error',
      //     meta: {
      //       title: 'Error',
      //     },
      //   },
      {
        path: 'staffs/:id/password',
        component: ChangePassword,
        meta: {
          title: 'ChangePassword',
        },
      },
      {
        path: 'sales',
        component: Sales,
        meta: {
          title: 'Sales',
        },
      },
      {
        path: 'salary',
        component: Salary,
        meta: {
          title: 'Salary',
        },
      },
      //   {
      //     path: 'payments',
      //     component: Payment,
      //     meta: {
      //       title: 'Payment',
      //     },
      //   },
      {
        path: 'mybooking/:id',
        component: MyBooking,
        meta: {
          title: 'MyBooking',
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  // always scroll to top
  scrollBehavior() {
    return { top: 0 };
  },
});
router.beforeEach(checkMiddleware);

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
});
export default router;
