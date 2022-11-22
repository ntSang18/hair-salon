<template>
  <div class="container padding-left-right">
    <Title title="Discount & Advertisement" />
    <div class="d-flex">
      <div>
        <div style="margin-top: 20px; padding-left: 20px; font-weight: 600; border-left: 10px solid #6741d9">
          Customer Type Discount
        </div>
        <div v-for="(type, index) in customerTypes" :key="type.Id">
          <div :class="['item-type', classType[index]]">
            <div class="d-flex justify-content-center align-item-center">
              <div class="icon">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa="">
                  <path
                    fill="#fff"
                    d="M512 896a256 256 0 1 0 0-512 256 256 0 0 0 0 512zm0 64a320 320 0 1 1 0-640 320 320 0 0 1 0 640z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M576 128H448v200a286.72 286.72 0 0 1 64-8c19.52 0 40.832 2.688 64 8V128zm64 0v219.648c24.448 9.088 50.56 20.416 78.4 33.92L757.44 128H640zm-256 0H266.624l39.04 253.568c27.84-13.504 53.888-24.832 78.336-33.92V128zM229.312 64h565.376a32 32 0 0 1 31.616 36.864L768 480c-113.792-64-199.104-96-256-96-56.896 0-142.208 32-256 96l-58.304-379.136A32 32 0 0 1 229.312 64z"
                  ></path>
                </svg>
              </div>
              <div class="type-name">{{ type.name }}</div>
            </div>
            <div class="type-percent">{{ type.percent }} %</div>
          </div>
        </div>
      </div>
      <div style="padding: 0px 100px; width: 100%">
        <div style="margin-top: 20px; padding-left: 20px; font-weight: 600; border-left: 10px solid #6741d9">
          Advertisement
        </div>
        <div style="margin-top: 20px">
          <div v-for="ad in ads" :key="ad.Id" class="list-ad">
            <div>{{ ad.title }}</div>
          </div>
        </div>
        <div class="item-create" @click="clickNewAd">
          <div class="icon">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa="">
              <path
                fill="#6741d9"
                d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"
              ></path>
            </svg>
          </div>
        </div>
        <div v-if="createAdShow" class="d-flex justify-content-around">
          <div>
            <div>Title:</div>
            <el-input v-model="createAdObj.title" class="input"></el-input>
            <div>Detail:</div>
            <el-input
              :autosize="{ minRows: 4, maxRows: 4 }"
              type="textarea"
              v-model="createAdObj.detail"
              class="input"
            ></el-input>
            <div style="margin-top: 50px" class="d-flex justify-content-between">
              <div>Image:</div>
              <button
                @click="selectImage()"
                style="
                  display: inline-block;
                  padding: 5px 10px;
                  border-radius: 3px;
                  border: 1px solid #6741d9;
                  color: #6741d9;
                  background-color: #fff;
                  margin-bottom: 20px;
                "
              >
                Upload
              </button>

              <input ref="fileInput" type="file" style="display: none" @change="pickImage()" />
            </div>
            <img :src="createAdObj.preview" alt="" class="image" />
          </div>
          <div>
            <div>
              <div>Voucher:</div>
              <el-input v-model="createAdObj.voucherCode" class="input"></el-input>
            </div>
            <div>
              <div>Amount:</div>
              <el-input v-model="createAdObj.amount" class="input"></el-input>
            </div>
            <div>
              <div>Time:</div>
              <el-date-picker
                v-model="createAdObj.date"
                type="daterange"
                unlink-panels
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date"
                :shortcuts="shortcuts"
              />
            </div>
            <div style="float: right; margin-top: 40px">
              <button class="btn-primary-white" style="margin-bottom: 20px" @click="createAd">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from '@/components/admin/Title';
import CustomerTypeService from '@/services/CustomerTypeService';
import AdvertisementService from '@/services/AdvertisementService';

export default {
  components: {
    Title,
  },
  data() {
    return {
      customerTypes: [],
      classType: ['gold', 'sliver', 'bronze', 'default'],
      createAdShow: false,
      createAdObj: {
        title: '',
        detail: '',
        preview: '',
        voucherCode: '',
        date: null,
        startDate: null,
        endDate: null,
        amount: 0,
      },
      imagePicked: null,
      ads: [],
    };
  },
  mounted() {
    this.getCustomerTypes();
    this.getAds();
  },
  methods: {
    async getCustomerTypes() {
      const response = await CustomerTypeService.getCustomerTypes();
      if (response && response.data) {
        this.customerTypes = response.data;
      }
    },
    clickNewAd() {
      this.createAdShow = !this.createAdShow;
      this.imagePicked = null;
      this.createAdObj = {
        title: '',
        detail: '',
        preview: '',
      };
    },
    pickImage() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        this.imagePicked = file[0];
        this.createAdObj.preview = URL.createObjectURL(this.imagePicked);
      }
    },
    selectImage() {
      this.$refs.fileInput.click();
    },
    async createAd() {
      const obj = new FormData();
      if (this.imagePicked) {
        obj.append('img', this.imagePicked);
      }
      obj.append('title', this.createAdObj.title);
      obj.append('detail', this.createAdObj.detail);
      obj.append('voucherCode', this.createAdObj.voucherCode);
      obj.append('startDate', this.createAdObj.date[0]);
      obj.append('endDate', this.createAdObj.date[1]);
      obj.append('amount', this.createAdObj.amount);
      const response = await AdvertisementService.createAd(obj);
      if (response && response.data) {
        this.$store.state.toast.success('Add successfully!');
      } else this.$store.state.toast.console.error('Add failed');
    },
    async getAds() {
      const response = await AdvertisementService.getAds();
      if (response && response.data) {
        this.ads = response.data;
      }
    },
  },
};
</script>

<style scoped>
.item-type {
  width: 180px;
  text-align: center;
  font-size: 20px;
  margin-top: 30px;
  color: #fff;
  padding: 16px 0px;
  border-radius: 6px;
}
.gold {
  background-color: #fab005;
}
.sliver {
  background-color: #ced4da;
}
.bronze {
  background-color: #f08c00;
}
.default {
  background-color: #495057;
}
.type-name {
  margin-top: 3px;
}
.item-create {
  height: 50px;
  width: 50px;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px 0px 0px;
}
.image {
  height: 200px;
  margin: 20px 0px 0px 30px;
  padding: 10px;
}
.input {
  width: 350px;
  height: 40px;
  margin-bottom: 30px;
}
.list-ad {
  margin-top: 10px;
  text-transform: uppercase;
}
</style>
