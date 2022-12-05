<template>
  <div>
    <section id="page-header" class="service">
      <div class="header-content">
        <h2>Discover all our services</h2>
        <p>Get to know all our services</p>
        <div class="inp-group">
          <img src="@/assets/client/images/logo/search.png" />
          <input type="search" placeholder="Search..." v-model="searchService" />
        </div>
      </div>
    </section>

    <section id="services-container" class="section-p1">
      <div id="service-sidebar" class="sidebar">
        <input type="checkbox" class="showfilter" id="showfilter" />
        <label for="showfilter" class="showfilter-label"></label>
        <div class="sidebar-items">
          <div class="sidebar-item">
            <h4>Collections</h4>
            <label>
              <input type="radio" :value="0" class="filter-item" v-model="filterService" />
              <span>Any</span>
            </label>
            <label v-for="serviceType in serviceTypes" :key="serviceType.Id">
              <input type="radio" :value="serviceType.Id" class="filter-item" v-model="filterService" />
              <span>{{ serviceType.name }}</span>
            </label>
          </div>
        </div>
      </div>
      <div class="services-content">
        <div class="content-description">
          List of services
          <div class="show">
            (<span id="countPosts">{{ servicesDisplay.length }}</span
            >)
          </div>
        </div>
        <div class="content-items">
          <p v-if="!servicesDisplay.length" id="empty-message">No matching service exists!</p>
          <div v-for="service in servicesDisplay" :key="service.Id" class="service-box">
            <img :src="service.image" />
            <div class="details">
              <h4>{{ service.name }}</h4>
              <span>{{ service.description }}</span>
              <strong>Price: {{ numberToPrice(service.price) }}</strong>
              <button>READ MORE</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import ServiceService from '@/services/ServiceService';
import numberToPrice from '@/utils/numberToPrice';
export default {
  name: 'Service',
  data() {
    return {
      servicesRaw: [],
      services: [],
      serviceTypes: [],
      filterService: 0,
      searchService: '',
    };
  },
  mounted() {
    this.getServices();
  },
  computed: {
    servicesDisplay() {
      if (this.filterService == 0) {
        return this.services.filter(service => {
          return service.name.toLowerCase().includes(this.searchService.trim().toLowerCase());
        });
      } else {
        return this.services.filter(service => {
          return (
            service.serviceTypeId == this.filterService &&
            service.name.toLowerCase().includes(this.searchService.trim().toLowerCase())
          );
        });
      }
    },
  },
  methods: {
    async getServices() {
      const res = await ServiceService.getServiceTypes();
      if (res.status == '200') {
        this.servicesRaw = res.data;
        let tempServices = [];
        this.servicesRaw.forEach(function (serviceType) {
          tempServices = tempServices.concat(serviceType.services);
        });
        this.services = tempServices.filter(service => !service.isDeleted);
        this.serviceTypes = this.servicesRaw.map(function (serviceTypes) {
          return {
            Id: serviceTypes.Id,
            name: serviceTypes.name,
            isDeleted: serviceTypes.isDeleted,
          };
        });
      }
    },
    numberToPrice(number) {
      return numberToPrice(number);
    },
  },
};
</script>
