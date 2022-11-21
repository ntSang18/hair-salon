<template>
  <div class="content container padding-left-right">
    <Title title="Staffs" />
    <div class="d-flex justify-content-between mb-4">
      <div class="w-75">
        <el-input
          placeholder="Search name or phone ..."
          class="w-25"
          style="margin-right: 10px"
          v-model="searchName"
          clearable
        />
        <el-select v-model="searchRole" class="w-25">
          <el-option v-for="item in roleOption" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div>
        <el-button type="success" @click="showDialog">Create</el-button>
        <el-button type="danger" @click="deleteAccounts">Delete</el-button>
      </div>
    </div>
    <div class="cover-table">
      <el-table ref="multipleTableRef" :data="staffs" border @selection-change="handleSelectionChange">
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
        <el-table-column property="role" label="Role">
          <template #default="scope">
            {{ scope.row.role.name }}
          </template>
        </el-table-column>
        <el-table-column property="gender" label="Gender">
          <template #default="scope">
            {{ GENDERS(scope.row.gender) }}
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
        <!-- <el-table-column label="Rate" width="100px" sortable prop="_count.rates">
          <template #default="scope">
            <div style="display: flex; align-items: center; justify-content: center">
              <div>
                {{ scope.row._count.rates }}
              </div>
              <div class="icon" style="display: inline-block">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa="">
                  <path
                    fill="#fab005"
                    d="M283.84 867.84 512 747.776l228.16 119.936a6.4 6.4 0 0 0 9.28-6.72l-43.52-254.08 184.512-179.904a6.4 6.4 0 0 0-3.52-10.88l-255.104-37.12L517.76 147.904a6.4 6.4 0 0 0-11.52 0L392.192 379.072l-255.104 37.12a6.4 6.4 0 0 0-3.52 10.88L318.08 606.976l-43.584 254.08a6.4 6.4 0 0 0 9.28 6.72z"
                  ></path>
                </svg>
              </div>
            </div>
          </template>
        </el-table-column> -->
        <el-table-column property="Booking" label="Booking" width="100">
          <template #default="scope">
            <div class="d-flex justify-content-center">
              <router-link :to="'/mybooking/' + scope.row.Id" v-if="scope.row.role.name == 'Barber'">
                <div class="icon">
                  <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa="">
                    <path
                      fill="#5646ab"
                      d="M832 384H576V128H192v768h640V384zm-26.496-64L640 154.496V320h165.504zM160 64h480l256 256v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32zm320 512V448h64v128h128v64H544v128h-64V640H352v-64h128z"
                    ></path>
                  </svg>
                </div>
              </router-link>
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
        <span class="header-dialog">New Employee</span>
      </template>
      <template #default>
        <div class="d-flex">
          <div class="content-profile">
            <div>
              <p>Name</p>
              <el-input class="w-50" v-model="addStaff.name" />
            </div>
            <div>
              <p>Gender</p>
              <el-select clearable v-model="addStaff.gender">
                <el-option v-for="gender in genderOption" :key="gender" :label="gender.label" :value="gender.value" />
              </el-select>
            </div>
            <div>
              <p>BirthDay</p>
              <el-date-picker v-model="addStaff.birthday" />
            </div>
            <div>
              <p>Department</p>
              <el-select clearable v-model="addStaff.departmentId">
                <el-option
                  v-for="department in departmentOption"
                  :key="department"
                  :label="department.label"
                  :value="department.value"
                />
              </el-select>
            </div>
            <div v-if="errDepartmentId" style="color: red; margin-left: 200px">This field is required</div>

            <div>
              <p>Phone</p>
              <el-input class="w-50" v-model="addStaff.phone" @blur="blurInputPhone" />
            </div>
            <div v-if="errPhone" style="color: red; margin-left: 200px">This field is not allow empty</div>
            <div>
              <p>Address</p>
              <el-input class="w-50" v-model="addStaff.address" @blur="blurInputAddress" />
            </div>
            <div v-if="errAddress" style="color: red; margin-left: 200px">This field is not allow empty</div>
            <div>
              <p>Role</p>
              <el-select clearable v-model="addStaff.roleId">
                <el-option v-for="role in roleCreateOption" :key="role" :label="role.label" :value="role.value" />
              </el-select>
            </div>
            <div v-if="errRoleId" style="color: red; margin-left: 200px">This field is required</div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="success" @click="createStaff">Create</el-button>
          <el-button type="danger" @click="showDialog">Cancel</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import Title from '@/components/admin/Title';
import StaffService from '@/services/StaffService';
import GENDERS from '@/common/gender';

export default {
  components: {
    Title,
  },
  data() {
    return {
      dialogCreate: false,
      selectAccounts: [],
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
      departmentOption: [
        {
          value: '1',
          label: 'D1',
        },
        {
          value: '2',
          label: 'D2',
        },
      ],
      roleOption: [
        {
          value: '',
          label: 'All',
        },
        {
          value: '1',
          label: 'Receptionist',
        },
        {
          value: '2',
          label: 'Barber',
        },
        {
          value: '3',
          label: 'Admin',
        },
      ],
      roleCreateOption: [
        {
          value: '1',
          label: 'Receptionist',
        },
        {
          value: '2',
          label: 'Barber',
        },
        {
          value: '3',
          label: 'Admin',
        },
      ],
      staffs: [],
      addStaff: {
        name: '',
        birthday: null,
        address: '',
        gender: true,
        roleId: '',
        phone: '',
        departmentId: '',
      },
      page: 1,
      pageSize: 5,
      totalPage: 1,
      searchName: '',
      searchRole: '',
      errAddress: false,
      errPhone: false,
      errRoleId: false,
      errDepartmentId: false,
    };
  },
  computed: {
    GENDERS: function () {
      return GENDERS;
    },
  },
  watch: {
    dialogCreate() {
      if (this.dialogCreate == false) {
        this.errAddress = false;
        this.errPhone = false;
        this.errRoleId = false;
        this.errDepartmentId = false;
        this.addStaff = {
          name: '',
          birthday: null,
          address: null,
          gender: true,
          roleId: '',
          phone: '',
          departmentId: '',
        };
      }
    },
    searchName() {
      this.page = 1;
      this.onSearchStaffs();
    },
    searchRole() {
      this.page = 1;
      this.onSearchStaffs();
    },
  },
  mounted() {
    this.getStaffs();
  },
  methods: {
    showDialog() {
      this.dialogCreate = !this.dialogCreate;
    },
    setPage() {
      this.onSearchStaffs();
    },
    async getStaffs() {
      const response = await StaffService.getStaffs(this.page, this.pageSize);
      if (response && response.status == '200') {
        this.staffs = response.data.staffs;
        this.totalPage = response.data.totalPage;
      }
    },

    async onSearchStaffs() {
      const response = await StaffService.searchStaffs(this.page, this.pageSize, this.searchName, this.searchRole);
      if (response && response.status == '200') {
        this.staffs = response.data.staffs;
        this.totalPage = response.data.totalPage;
      }
    },

    async createStaff() {
      this.blurInputAddress();
      this.blurInputPhone();
      if (this.addStaff.departmentId == '') this.errDepartmentId = true;
      else this.errDepartment = false;
      if (this.addStaff.roleId == '') this.errRoleId = true;
      else this.errDepartment = false;
      if (this.errAddress || this.errPhone) return;
      const response = await StaffService.createStaff(this.addStaff);
      if (response && response.status == '200') {
        this.$store.state.toast.success('Add staff success');
        this.getStaffs();
        this.showDialog();
      } else this.$store.state.toast.error(response.err.response.data);
    },

    async deleteAccount(id) {
      const response = await StaffService.deleteStaff(id);
      if (response && response.status == '200') {
        this.$store.state.toast.success('Account is deleted');
      }
      this.getStaffs();
    },
    blurInputAddress() {
      if (this.addStaff.address == '') this.errAddress = true;
      else this.errAddress = false;
    },
    blurInputPhone() {
      if (this.addStaff.phone == '') this.errPhone = true;
      else this.errPhone = false;
    },
    handleSelectionChange(val) {
      this.selectAccounts = val;
    },

    deleteAccounts() {
      if (this.selectAccounts.length == 0) this.$store.state.toast.error('No account is choose!');
    },
    convertDateTimeToDate(datetime) {
      return String(datetime).slice(0, 10);
    },
  },
};
</script>

<style scoped>
.content {
  padding: -20px -20px;
  height: calc(100vh - 100px);
}
/* .icon {
  margin-right: 5px;
  height: 30px;
  width: 30px;
  fill: #757575;
} */
p {
  font-size: 18px;
  margin-left: 10px;
}
.title-dialog {
  color: #12b886;
  font-size: 22px;
}

.form-edit > div {
  display: flex;
  margin: 10px 0;

  margin-left: 200px;
}
.form-edit > div > span {
  width: 120px;
  line-height: 40px;
}
.form-edit > div > el-input {
  width: 30px;
}
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
/* .icon:hover {
  cursor: pointer;
} */
</style>
