<template>
  <div class="container padding-left-right">
    <Title title="Detail" />
    <div class="row" style="padding: 0 200px">
      <div class="col content-service">
        <img src="@/assets/dichvu.jpg" alt="" class="margin-bottom image" />
        <div class="row margin-bottom">
          <div class="col-lg-3">Name</div>
          <el-input class="col" v-model="service.name"></el-input>
        </div>
        <div class="row margin-bottom">
          <div class="col-lg-3">Description</div>
          <el-input
            class="col"
            :autosize="{ minRows: 3, maxRows: 4 }"
            type="textarea"
            v-model="service.description"
          ></el-input>
        </div>
        <div class="row margin-bottom">
          <div class="col">Price</div>
          <el-input class="col" v-model="service.price"></el-input>
        </div>
        <el-button type="success" @click="updateService" style="float: right">Save</el-button>
      </div>

      <!-- <div class="col content-rate"> -->
      <!-- <div>
          <div class="title">Rate</div>
          <div class="mr">Point: 4.8/5</div>
          <div class="mr">Reviews: 100</div>
          <div class="mr">Rank: 4/10</div>
        </div> -->
      <!-- <div>
          <div class="title">Comment</div>
          <div class="d-flex comment">
            <div class="avatar mr">
              <img src="@/assets/avatar.jpg" alt="" />
            </div>
            <div>
              <span style="display: inline-block">Name</span>
              <div>Good</div>
            </div>
          </div>
          <div class="d-flex comment">
            <div class="avatar mr">
              <img src="@/assets/avatar.jpg" alt="" />
            </div>
            <div>
              <span style="display: inline-block">Name</span>
              <div>Good</div>
            </div>
          </div>
        </div> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import Title from '@/components/admin/Title';
import ServiceService from '@/services/ServiceService';
export default {
  components: {
    Title,
  },
  data() {
    return {
      service: {},
    };
  },
  mounted() {
    this.getService();
  },
  methods: {
    async getService() {
      const response = await ServiceService.getService(this.$route.params.id);
      if (response && response.status == '200') this.service = response.data;
    },
    async updateService() {
      const response = await ServiceService.updateService({ ...this.service });
      if (response && response.status == '200') this.$store.state.toast.success('Update service successfully');
      else this.$store.state.toast.error('Update service failed!');
    },
  },
};
</script>

<style scoped>
.image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: 200px;
}
.content-service {
  padding: 0 120px;
}
.margin-bottom {
  margin-bottom: 20px;
}
.avatar {
  display: flex;
  flex-direction: row;
}
.avatar > img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid black;
  padding: 0;
  margin-right: 20px;
}
.content-rate {
  padding: 0 120px;
  display: flex;
  flex-direction: column;
}
.title {
  border-left: 10px solid #484e53;
  padding-left: 16px;
  margin: 22px 0;
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 600;
}
.mr {
  margin-left: 80px;
}
.comment {
  margin-bottom: 10px;
  align-items: center;
}
</style>
