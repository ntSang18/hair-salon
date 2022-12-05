<template>
  <div>
    <div class="container padding-left-right">
      <Title title="Services" />
      <div class="d-flex flex-wrap justify-content-center align-items-center">
        <div v-for="service in services" :key="service.Id" style="margin: 10px 30px">
          <Service :service="service" :showDeleteServiceDialog="showDeleteServiceDialog" />
        </div>
      </div>
    </div>
    <el-dialog v-model="dialogDelete" title="Notice" width="30%" destroy-on-close center>
      <span> Notice: Are you sure you want to delete this service? </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogDelete = false">Cancel</el-button>
          <el-button type="danger" @click="deleteService()"> Delete </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import Title from '@/components/admin/Title';
import Service from '@/components/admin/Service';
import ServiceTypeService from '@/services/ServiceTypeService';
import ServiceService from '@/services/ServiceService';
export default {
  components: {
    Title,
    Service,
  },
  data() {
    return {
      services: [],
      idServiceDelete: null,
      dialogDelete: false,
    };
  },
  mounted() {
    this.getServiceTypes();
  },
  methods: {
    async getServiceTypes() {
      const response = await ServiceTypeService.getServiceType(this.$route.params.id);
      if (response && response.status == '200')
        this.services = response.data.services.filter(service => {
          return !service.isDeleted;
        });
    },
    showDeleteServiceDialog(id) {
      this.idServiceDelete = id;
      this.dialogDelete = !this.dialogDelete;
    },
    async deleteService() {
      const obj = {
        idArray: this.idServiceDelete,
      };
      const res = await ServiceService.deleteService(obj);
      if (res.status == '204') {
        this.$store.state.toast.success('Delete service successfully');
        this.getService();
        this.dialogDelete = false;
        this.idServiceDelete = null;
      } else this.$store.state.toast.error(res.data);
    },
  },
};
</script>

<style scoped></style>
