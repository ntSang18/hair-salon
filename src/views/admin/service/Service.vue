<template>
  <div>
    <div class="container padding-left-right">
      <Title title="Services" />
      <div class="col">
        <div>
          <button class="btn-primary-yellow" style="margin-bottom: 30px" @click="ShowAddType">Add Type</button>
        </div>
        <div class="mb-4 d-flex flex-column" v-for="item in services" :key="item.Id">
          <div class="d-flex justify-content-between">
            <div class="service-type-item">{{ item.name }}</div>
            <el-button @click="ShowAddService(item.Id)" type="success">New Service</el-button>
          </div>
          <div class="row-item">
            <div v-for="service in item.services.slice(0, 4)" :key="service.Id">
              <Service :service="service" />
            </div>
          </div>
          <div class="d-flex justify-content-center" style="margin-top: 20px">
            <button class="btn-primary-white">
              <router-link
                :to="'/serviceTypes/' + item.Id"
                style="text-decoration: none; color: #f59f00; font-size: 12px"
                >Show more ...</router-link
              >
            </button>
          </div>
        </div>
      </div>
    </div>
    <el-dialog v-model="dialogCreate">
      <template #header>
        <span class="header-dialog">Add Service</span>
      </template>
      <template #default>
        <div class="d-flex">
          <div class="content-profile">
            <div>
              <p>Name</p>
              <el-input class="w-50" v-model="addObjService.name" />
            </div>
            <div>
              <p>Description</p>
              <el-input class="w-50" v-model="addObjService.description" type="textarea" />
            </div>
            <div>
              <p>Price</p>
              <el-input class="w-50" style="margin-top: 18px" v-model="addObjService.price" @blur="checkStylePrice" />
            </div>
            <div v-if="errorPrice" style="color: red">This field must be the number</div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="success" @click="AddService()">Create</el-button>
          <el-button type="danger" @click="ShowAddService">Cancel</el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog v-model="dialogCreateType">
      <template #header>
        <span class="header-dialog">Add Type</span>
      </template>
      <template #default>
        <div class="d-flex">
          <div class="content-profile">
            <div>
              <p>Name</p>
              <el-input class="w-50" v-model="addObjType.name" />
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="success" @click="AddTypeService()">Create</el-button>
          <el-button type="danger" @click="ShowAddType">Cancel</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import Service from '@/components/admin/Service';
import Title from '@/components/admin/Title';
import ServiceService from '@/services/ServiceService';
import ServiceTypeService from '@/services/ServiceTypeService';

export default {
  components: {
    Title,
    Service,
  },
  data() {
    return {
      services: [],
      addObjService: {
        name: '',
        description: '',
        price: 0,
        serviceTypeId: null,
      },
      addObjType: {
        name: '',
      },
      dialogCreate: false,
      idType: null,
      errorPrice: false,
      dialogCreateType: false,
    };
  },
  mounted() {
    this.getService();
  },
  methods: {
    async getService() {
      const response = await ServiceService.getServiceTypes();
      if (response && response.status == '200') this.services = response.data;
    },
    ShowAddService(idType) {
      this.idType = idType;
      this.dialogCreate = !this.dialogCreate;
    },
    ShowAddType() {
      this.dialogCreateType = !this.dialogCreateType;
    },
    async AddService() {
      this.addObjService.serviceTypeId = this.idType;
      const response = await ServiceService.createService({ ...this.addObjService });
      if (response && response.status == '200') {
        this.$store.state.toast.success('Add service successfully');
        this.ShowAddType();
        this.getService();
      } else this.$store.state.toast.error(response.data);
    },
    checkStylePrice() {
      const price = isNaN(this.addObjService.price);
      if (price) this.errorPrice = true;
      else this.errorPrice = false;
    },
    async AddTypeService() {
      const response = await ServiceTypeService.createServiceType({ ...this.addObjType });
      if (response && response.status == '200') this.$store.state.toast.success('Add type successfully');
      else this.$store.state.toast.error('Add type failed');
    },
  },
};
</script>

<style scoped>
.icon {
  height: 50px;
  width: 50px;
}
.row-item {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.service-type-item {
  border-left: 10px solid #6741d9;
  padding-left: 16px;
  margin-bottom: 24px;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 600;
}
/* .btn-show {
  width: 100px;
} */
.content-profile {
  margin: 0 30px;
  width: 60%;
}
.content-profile p {
  line-height: 40px;
  width: 30%;
}
.content-profile > div {
  display: flex;
  height: 40px;
  margin-bottom: 10px;
}
</style>
