<template>
  <div class="content container padding-left-right">
    <Title title="Customers" />
    <div class="d-flex justify-content-between mb-4">
      <div class="w-75">
        <el-input
          placeholder="Search name or phone ..."
          class="w-25"
          style="margin-right: 10px"
          v-model="searchName"
          clearable
        />
        <el-select v-model="searchCustomerType" class="w-25">
          <el-option v-for="item in customerTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div>
        <el-button type="success" @click="showDialogCreate">Create</el-button>
        <el-button type="danger" @click="deleteAccounts">Delete</el-button>
      </div>
    </div>
    <div class="cover-table">
      <el-table ref="multipleTableRef" :data="customers" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column label="Name" width="120">
          <template #default="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column property="phone" label="Phone">
          <template #default="scope">
            {{ scope.row.phone }}
          </template>
        </el-table-column>
        <el-table-column property="birthday" label="Birthday">
          <template #default="scope">
            {{ convertDateTimeToDate(scope.row.birthday) }}
          </template>
        </el-table-column>
        <el-table-column property="gender" label="Gender">
          <template #default="scope">
            {{ GENDERS(scope.row.gender) }}
          </template>
        </el-table-column>
        <el-table-column property="type" label="Type">
          <template #default="scope">
            {{ scope.row.customerType.name }}
          </template>
        </el-table-column>
        <el-table-column property="action" label="Action" width="160">
          <template #default="scope">
            <div class="d-flex justify-content-center">
              <router-link :to="'/accounts/' + scope.row.Id">
                <div class="icon">
                  <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa="">
                    <path
                      fill="#5646ab"
                      d="M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640V512z"
                    ></path>
                    <path
                      fill="#5646ab"
                      d="m469.952 554.24 52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z"
                    ></path>
                  </svg>
                </div>
              </router-link>
              <div class="icon" @click="deleteAccount(scope.row.Id)" style="margin: -1px 0px 0px 5px">
                <svg fill="#5646ab" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa="">
                  <path
                    fill="currentColor"
                    d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
                  ></path>
                </svg>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="d-flex justify-content-center"
        :page-size="pageSize"
        layout="prev, pager, next"
        :page-count="totalPage"
        v-model:currentPage="page"
        @current-change="setPage"
      >
      </el-pagination>
    </div>
    <el-dialog v-model="dialogCreate">
      <template #header>
        <span class="header-dialog">New Customer</span>
      </template>
      <template #default>
        <div class="d-flex">
          <div class="content-profile">
            <div>
              <p>Name</p>
              <el-input class="w-50" v-model="addCustomer.name" />
            </div>
            <div>
              <p>Gender</p>
              <el-select clearable v-model="addCustomer.gender">
                <el-option v-for="gender in genderOption" :key="gender" :label="gender.label" :value="gender.value" />
              </el-select>
            </div>
            <div>
              <p>Phone</p>
              <el-input class="w-50" v-model="addCustomer.phone" @blur="blurInputPhone" />
            </div>
            <div>
              <p>CustomerType</p>
              <el-select v-model="defaultType"> </el-select>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="success" @click="createCustomer">Create</el-button>
          <el-button type="danger" @click="showDialogCreate">Cancel</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import Title from '@/components/admin/Title';
import CustomerService from '@/services/CustomerService';
import GENDERS from '@/common/gender';
import { TYPES } from '@/common/customerType';
export default {
  components: {
    Title,
  },
  data() {
    return {
      selectAccounts: [],
      customers: [],
      addCustomer: {
        name: '',
        gender: true,
        customerTypeId: TYPES.isDefault,
      },
      genderOption: [
        {
          value: true,
          label: 'Male',
        },
        {
          value: false,
          label: 'Female',
        },
      ],
      defaultType: 'Default',
      customerTypeOptions: [
        {
          label: 'All',
          value: '0',
        },
        {
          value: '1',
          label: 'Gold',
        },
        {
          value: '2',
          label: 'Silver',
        },
        {
          value: '3',
          label: 'Bronze',
        },
        {
          value: '4',
          label: 'Default',
        },
      ],
      page: 1,
      pageSize: 5,
      totalPage: 1,
      searchName: '',
      searchCustomerType: {
        label: 'All',
        value: '0',
      },
      dialogCreate: false,
    };
  },
  computed: {
    GENDERS: function () {
      return GENDERS;
    },
  },
  watch: {
    searchName() {
      this.page = 1;
      this.onSearchCustomers();
    },
    searchCustomerType() {
      this.page = 1;
      this.onSearchCustomers();
    },
  },
  mounted() {
    this.getCustomers();
  },
  methods: {
    setPage() {
      this.onSearchCustomers();
    },
    showDialogCreate() {
      this.dialogCreate = !this.dialogCreate;
      this.addCustomer = {
        name: '',
        gender: true,
        customerTypeId: TYPES.isDefault,
      };
    },
    async getCustomers() {
      const response = await CustomerService.searchCustomers(this.page, this.pageSize);
      if (response && response.status == '200') {
        this.customers = response.data.customers;
        this.totalPage = response.data.totalPage;
      }
    },
    async onSearchCustomers() {
      const response = await CustomerService.searchCustomers(
        this.page,
        this.pageSize,
        this.searchName,
        this.searchCustomerType.value == undefined ? this.searchCustomerType : this.searchCustomerType.value,
      );
      if (response && response.status == '200') {
        this.customers = response.data.customers;
        this.totalPage = response.data.totalPage;
      }
    },
    async createCustomer() {
      const response = await CustomerService.createCustomer(this.addCustomer);
      if (response && response.status == '200') {
        this.$store.state.toast.success('Add customer success');
        this.showDialogCreate();
        this.getCustomers();
      } else this.$store.state.toast.error(response.err.response.data);
    },
    async deleteAccount(id) {
      const response = await CustomerService.deleteCustomer(id);
      if (response && response.status == '200') {
        this.$store.state.toast.success('Account is deleted');
        this.customers = this.customers.filter(function (item) {
          return item.Id !== id;
        });
      }
    },
    convertDateTimeToDate(datetime) {
      return String(datetime).slice(0, 10);
    },
  },
};
</script>

<style scoped>
.content-profile {
  margin: 0 30px;
  width: 70%;
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
.icon:hover {
  cursor: pointer;
}
</style>
