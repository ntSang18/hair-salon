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
              <Service :service="service" :showDeleteServiceDialog="showDeleteServiceDialog" />
            </div>
          </div>
          <div class="d-flex justify-content-center" style="margin-top: 20px">
            <button v-if="item.services.length > 4" class="btn-primary-white">
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
    <el-dialog v-model="dialogCreate" @close="CloseAddService()">
      <template #header>
        <span class="header-dialog">Add Service</span>
      </template>
      <template #default>
        <div class="content-profile">
          <div class="img-container">
            <img v-if="!imagePickedPath" src="@/assets/image-placeholder.png" @click="selectImage()" />
            <img v-else :src="imagePickedPath" @click="selectImage()" />
            <p v-if="addObjError.images">Image can't be null</p>
            <input type="file" ref="fileInput" id="img-service" @change="pickImage()" />
            <button @click="selectImage()">Pick image</button>
          </div>
          <div class="inp-group">
            <div>
              <p>Name</p>
              <input type="text" v-model="addObjService.name" />
            </div>
            <p v-if="addObjError.name">Name can't be null</p>
          </div>
          <div class="inp-group">
            <div>
              <p>Description</p>
              <textarea v-model="addObjService.description" />
            </div>
            <p v-if="addObjError.description">Description can't be null</p>
          </div>
          <div class="inp-group">
            <div>
              <p>Price</p>
              <input type="number" v-model="addObjService.price" @blur="checkStylePrice" />
            </div>
            <p v-if="addObjError.price">Price can't be null</p>
          </div>
          <div v-if="errorPrice" style="color: red">This field must be the number</div>
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
      addObjError: {
        name: false,
        description: false,
        price: false,
        images: false,
      },
      addObjType: {
        name: '',
      },
      imagePicked: null,
      imagePickedPath: '',
      dialogCreate: false,
      errorPrice: false,
      dialogCreateType: false,
      idServiceDelete: null,
      dialogDelete: false,
    };
  },
  mounted() {
    this.getService();
  },
  methods: {
    async getService() {
      const response = await ServiceService.getServiceTypes();
      if (response && response.status == '200') this.services = response.data;
      for (let i = 0; i < this.services.length; i++) {
        this.services[i].services = this.services[i].services.filter(service => !service.isDeleted);
      }
    },
    ShowAddService(idType) {
      this.addObjService.serviceTypeId = idType;
      this.dialogCreate = !this.dialogCreate;
    },
    CloseAddService() {
      this.addObjService.name = '';
      this.addObjService.description = '';
      this.addObjService.price = 0;
      this.addObjService.serviceTypeId = null;
      this.imagePicked = null;
      this.imagePickedPath = '';
      this.addObjError.name = false;
      this.addObjError.description = false;
      this.addObjError.price = false;
      this.addObjError.images = false;
    },
    selectImage() {
      this.$refs.fileInput.click();
    },
    pickImage() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        this.imagePicked = file[0];
        this.imagePickedPath = URL.createObjectURL(this.imagePicked);
      }
    },
    ShowAddType() {
      this.dialogCreateType = !this.dialogCreateType;
    },
    async AddService() {
      this.addObjError.images = false;
      this.addObjError.name = false;
      this.addObjError.description = false;
      this.addObjError.price = false;
      if (!this.imagePickedPath) this.addObjError.images = true;
      else if (!this.addObjService.name.trim()) this.addObjError.name = true;
      else if (!this.addObjService.description.trim()) this.addObjError.description = true;
      else if (!this.addObjService.price) this.addObjError.price = true;
      else {
        const obj = new FormData();
        obj.append('name', this.addObjService.name);
        obj.append('description', this.addObjService.description);
        obj.append('price', this.addObjService.price);
        obj.append('serviceTypeId', this.addObjService.serviceTypeId);
        obj.append('images', this.imagePicked);
        const response = await ServiceService.createService(obj);
        if (response && response.status == '200') {
          this.$store.state.toast.success('Add service successfully');
          this.getService();
          this.dialogCreate = false;
        } else this.$store.state.toast.error(response.data);
      }
    },
    showDeleteServiceDialog(id) {
      this.idServiceDelete = id;
      this.dialogDelete = !this.dialogDelete;
    },
    async deleteService() {
      const obj = {
        idArray: [this.idServiceDelete],
      };
      const res = await ServiceService.deleteService(obj);
      if (res.status == '200') {
        this.$store.state.toast.success('Delete service successfully');
        this.getService();
        this.dialogDelete = false;
        this.idServiceDelete = null;
      } else this.$store.state.toast.error(res.data);
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

.content-profile {
  padding: 0px 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.img-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 10px;
}

.img-container input {
  display: none;
}

.img-container p {
  color: red;
}

.img-container button {
  width: fit-content;
  padding: 4px 16px;
  border-radius: 5px;
  border: none;
  outline: none;
  background-color: rgb(0, 119, 255);
  color: #ffffff;
  font-weight: 700;
}

.img-container img {
  margin-bottom: 10px;
  width: auto;
  height: 200px;
  cursor: pointer;
}

.inp-group {
  padding: 10px 0px;
}

.inp-group div {
  display: grid;
  grid-template-columns: 1fr 4fr;
}
.inp-group input,
.inp-group textarea {
  padding: 0px 10px;
  outline: none;
}

.inp-group > p {
  color: red;
}
</style>
