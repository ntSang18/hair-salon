<template>
  <div class="w-100">
    <div class="container">
      <el-menu
        class="menu"
        active-text-color="#d0bfff"
        background-color="#5646ab"
        text-color="#fff"
        :unique-opened="true"
        mode="horizontal"
        default-active="2-1"
      >
        <el-sub-menu index="2">
          <template #title>
            <span class="span-menu">Employees</span>
          </template>
          <el-menu-item index="2-1"
            ><router-link to="/accounts" class="router-item span-menu">Staff</router-link></el-menu-item
          >
          <el-menu-item index="2-2"
            ><router-link to="/customers" class="router-item span-menu">Customer</router-link></el-menu-item
          >
          <el-menu-item index="2-3"
            ><router-link to="/departments" class="router-item span-menu">Department</router-link></el-menu-item
          >
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <span class="span-menu">Booking</span>
          </template>
          <el-menu-item index="3-1"
            ><router-link :to="'/mybooking/' + id" class="router-item span-menu"
              >My Appointment</router-link
            ></el-menu-item
          >
          <el-menu-item index="3-2"
            ><router-link to="/bookings" class="router-item span-menu">Booking</router-link></el-menu-item
          >
        </el-sub-menu>
        <el-menu-item index="4">
          <template #title>
            <router-link to="/salary" class="router-item span-menu">Salary</router-link>
          </template>
        </el-menu-item>
        <el-menu-item index="5">
          <template #title>
            <router-link to="/services" class="router-item span-menu">Services</router-link>
          </template>
        </el-menu-item>
        <el-menu-item index="6">
          <template #title>
            <router-link to="/discounts" class="router-item span-menu">Discounts</router-link>
          </template>
        </el-menu-item>
        <el-menu-item index="7">
          <template #title>
            <router-link to="/sales" class="router-item span-menu">Sales</router-link>
          </template>
        </el-menu-item>
        <el-menu-item index="8">
          <template #title>
            <router-link to="/payments" class="router-item span-menu">Payment</router-link>
          </template>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
    };
  },
  mounted() {
    document.querySelectorAll('.el-sub-menu__icon-arrow').forEach(el => el.remove());
    this.id = this.$store.state.staff.Id;
  },
};
</script>

<style style="scss" scoped>
.span-menu {
  font-size: 16px;
  font-weight: 500;
}
.menu {
  display: flex;
  justify-content: center;
}
.router-item {
  text-decoration: none;
  color: inherit;
}
</style>
