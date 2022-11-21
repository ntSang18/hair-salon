<template>
  <div class="container padding-left-right">
    <Title title="Services" />
    <div class="d-flex flex-wrap justify-content-center align-items-center">
      <div v-for="service in services.services" :key="service.Id" style="margin: 10px 30px">
        <Service :service="service" />
      </div>
    </div>
  </div>
</template>

<script>
import Title from '@/components/admin/Title';
import Service from '@/components/admin/Service';
import ServiceTypeService from '@/services/ServiceTypeService';
export default {
  components: {
    Title,
    Service,
  },
  data() {
    return {
      services: [],
    };
  },
  mounted() {
    this.getServiceTypes();
  },
  methods: {
    async getServiceTypes() {
      const response = await ServiceTypeService.getServiceType(this.$route.params.id);
      if (response && response.status == '200') this.services = response.data;
    },
  },
};
</script>

<style scoped></style>
