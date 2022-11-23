<template>
  <div class="container padding-left-right">
    <Title title="Departments" />
    <div class="d-flex justify-content-between mb-4">
      <div class="w-75"></div>
      <div>
        <el-button type="success" @click="showDialogCreate">Create</el-button>
        <el-button type="danger">Delete</el-button>
      </div>
    </div>
    <div class="cover-table">
      <el-table ref="multipleTableRef" :data="departments" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column property="department" label="Department" width="320">
          <template #default="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column property="manager" label="Manager">
          <template #default="scope">
            {{ scope.row.managerId }}
          </template>
        </el-table-column>
        <el-table-column property="action" label="Action" width="160">
          <template #default="scope">
            <div class="d-flex justify-content-center">
              <div class="icon" @click="showDialogUpdate(scope.row.Id)">
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

              <div class="icon" @click="deleteDepartment(scope.row.Id)" style="margin: -1px 0px 0px 5px">
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
    </div>
    <el-dialog v-model="dialogCreate">
      <template #header>
        <span class="header-dialog">New Department</span>
      </template>
      <template #default>
        <div class="d-flex">
          <div class="content-profile">
            <div class="d-flex">
              <p>Name</p>
              <el-input class="w-50" v-model="addDepartment.name" />
            </div>
            <div class="d-flex">
              <p>Manager</p>
              <el-select clearable v-model="addDepartment.managerId">
                <el-option v-for="staff in staffs" :key="staff.Id" :label="staff.name" :value="staff.Id" />
              </el-select>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="success" @click="createDepartment">Create</el-button>
          <el-button type="danger" @click="showDialogCreate">Cancel</el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog v-model="dialogUpdate">
      <template #header>
        <span class="header-dialog">Edit Department</span>
      </template>
      <template #default>
        <div class="d-flex">
          <div class="content-profile">
            <div>
              <p>Name</p>
              <el-input class="w-50" v-model="addDepartment.name" />
            </div>
            <div>
              <p>Manager</p>
              <el-select clearable v-model="addDepartment.managerId">
                <el-option v-for="staff in staffs" :key="staff.Id" :label="staff.name" :value="staff.Id" />
              </el-select>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="success" @click="updateDepartment">Edit</el-button>
          <el-button type="danger" @click="showDialogUpdate">Cancel</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import Title from '@/components/admin/Title';
import DepartmentService from '@/services/DepartmentService';
import StaffService from '@/services/StaffService';

export default {
  components: {
    Title,
  },
  data() {
    return {
      selectAccounts: [],
      dialogDelete: false,
      departments: [],
      dialogCreate: false,
      dialogUpdate: false,
      staffs: [],
      addDepartment: {
        name: '',
        managerId: '',
      },
    };
  },
  mounted() {
    this.getDepartments();
    this.getStaffs();
  },
  methods: {
    handleSelectionChange(val) {
      this.selectAccounts = val;
    },
    showDialogCreate() {
      this.dialogCreate = !this.dialogCreate;
    },
    showDialogUpdate(id = null) {
      this.dialogUpdate = !this.dialogUpdate;
      if (this.dialogUpdate)
        this.addDepartment = this.departments.filter(el => {
          return el.Id == id;
        })[0];
      else {
        this.addDepartment = {
          name: '',
          managerId: '',
        };
      }
    },

    async getDepartments() {
      const response = await DepartmentService.getDepartments();
      if (response && response.status == '200') this.departments = response.data;
    },
    async getStaffs() {
      const responseStaff = await StaffService.getStaffs();
      if (responseStaff && responseStaff.status == '200') this.staffs = responseStaff.data.staffs;
    },
    async createDepartment() {
      const response = await DepartmentService.createDepartment(this.addDepartment);
      if (response && response.status == '200') {
        this.$store.state.toast.success('Create department success');
        this.getDepartments();
        this.showDialogCreate();
      } else this.$store.state.toast.error(response.err.response.data);
    },
    async updateDepartment() {
      const response = await DepartmentService.updateDepartment(this.addDepartment);
      if (response && response.status == '200') {
        this.$store.state.toast.success('Update department success');
        this.getDepartments();
        this.showDialogUpdate();
      } else this.$store.state.toast.error('Update department failed');
    },
    async deleteDepartment(id) {
      const obj = {
        idArray: [id],
      };
      const response = await DepartmentService.deleteDepartments({ ...obj });
      if (response && response.status == '200') {
        this.$store.state.toast.success('Department is deleted');
        this.getDepartments();
      } else this.$store.state.toast.error('Deleted department failed');
    },
  },
};
</script>

<style scoped>
p {
  font-size: 18px;
  margin-left: 10px;
}
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
