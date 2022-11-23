<template>
  <div class="service">
    <img src="@/assets/dichvu.jpg" alt="" />
    <h3>{{ service.name }}</h3>
    <h5>{{ service.price }} VNĐ</h5>
    <button class="btn-primary-yellow">
      <router-link :to="'/services/' + service.Id" class="router-item" style="text-decoration: none; color: white"
        >More info</router-link
      >
    </button>
  </div>
</template>
<script>
export default {
  props: {
    service: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.service {
  width: 240px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border: 2px solid #d9dcdf;
  border-radius: 10px;
  overflow: hidden;
  padding: 10px 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 4px 8px 0 rgba(0, 0, 0, 0.19);
  background-color: #fff;
}
button {
  font-weight: 400;
  width: 40%;
  margin: 0 auto;
  border: 1px solid #d9dcdf;
  border-radius: 5px;
  padding: 5px;
  font-size: 12px;
}
h3 {
  margin-top: 5px;
  font-size: 16px;
  font-weight: 600;
  padding: 0 5px;
}
/* h4 {
  padding: 0 5px;
  font-size: 12px;
  font-weight: 400;
} */
h5 {
  font-weight: 500;
  padding: 40px 10px 10px 10px;
  font-size: 16px;
}
.description {
  height: 80px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
}
</style>
