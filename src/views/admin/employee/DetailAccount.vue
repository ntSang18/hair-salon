<template>
  <div class="padding-left-right container">
    <Title title="Profile" />
    <div class="d-flex justify-content-center">
      <div>
        <img :src="account.imagePath" alt="" class="avatar" />
        <input ref="fileInput" type="file" class="btn-avatar" @change="pickImage()" />
        <div class="d-flex justify-content-center" style="margin-top: 10px">
          <button
            @click="selectImage()"
            style="
              display: inline-block;
              padding: 5px 10px;
              border-radius: 3px;
              border: 1px solid #6741d9;
              color: #6741d9;
              background-color: #fff;
            "
          >
            Upload
          </button>
        </div>
      </div>
      <div class="content-profile">
        <div>
          <p>Name</p>
          <el-input class="w-50" v-model="account.name" />
        </div>
        <div>
          <p>Gender</p>
          <el-select clearable v-model="gender">
            <el-option v-for="gender in genderOption" :key="gender" :label="gender.label" :value="gender.value" />
          </el-select>
        </div>
        <div>
          <p>BirthDay</p>
          <el-date-picker v-model="account.birthday" />
        </div>
        <div>
          <p>Department</p>
          <el-select clearable v-model="department">
            <el-option
              v-for="department in departmentOption"
              :key="department"
              :label="department.label"
              :value="department.value"
            />
          </el-select>
        </div>
        <div>
          <p>Phone</p>
          <el-input class="w-50" v-model="account.phone" />
        </div>
        <div>
          <p>Address</p>
          <el-input class="w-50" v-model="account.address" />
        </div>
        <div>
          <p>Role</p>
          <el-select clearable v-model="role" :disabled="ROLES.isAdmin != $store.state.staff.roleId">
            <el-option v-for="role in roleOption" :key="role" :label="role.label" :value="role.value" />
          </el-select>
        </div>
        <button class="button" @click="updateStaff">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import Title from '@/components/admin/Title';
import StaffService from '@/services/StaffService';
import isDeepEqual from '@/utils/isDeepEqual';
import { ROLES } from '@/common/role';
export default {
  components: {
    Title,
  },
  data() {
    return {
      idAccount: '',
      constAccount: null,
      account: {
        name: '',
      },
      gender: '',
      role: {
        value: '',
        label: '',
      },
      department: { value: '', label: '' },
      genderOption: [
        {
          value: 'Male',
          label: 'Male',
        },
        {
          value: 'Female',
          label: 'Female',
        },
      ],
      roleOption: [
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
      imagePicked: null,
      typeCustomerOption: {
        1: 'Gold',
        2: 'Sliver',
        3: 'Bronze',
        4: 'Default',
      },
    };
  },
  watch: {
    gender() {
      if (this.gender == 'Male') this.account.gender = true;
      else this.account.gender = false;
    },
    role() {
      this.account.roleId = parseInt(this.role);
    },
    department() {
      this.account.departmentId = parseInt(this.department);
    },
  },
  computed: {
    ROLES: function () {
      return ROLES;
    },
  },
  mounted() {
    this.idAccount = this.$route.params.id;
    this.getStaff(this.idAccount);
  },
  methods: {
    pickImage() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        this.imagePicked = file[0];
        this.account.imagePath = URL.createObjectURL(this.imagePicked);
      }
    },
    selectImage() {
      this.$refs.fileInput.click();
    },
    async getStaff(id) {
      const response = await StaffService.getStaff(id);
      if (response && response.status == '200') {
        this.account = response.data;
        this.account.imagePath = this.account.imagePath ? `http://${this.account.imagePath}` : '';
        this.constAccount = { ...response.data };
        this.gender = this.account.gender == true ? 'Male' : 'Female';
        this.role.label = this.account.role.name;
        this.role.value = this.account.role.Id;
        this.department.label = this.account.department.name;
        this.department.value = this.account.department.Id;
      }
    },
    async updateStaff() {
      if (!this.checkChangeData()) {
        const obj = new FormData();

        obj.append('gender', this.account.gender);
        obj.append('name', this.account.name);
        obj.append('birthday', this.account.birthday);
        obj.append('departmentId', this.account.departmentId);
        obj.append('phone', this.account.phone);
        obj.append('roleId', this.account.roleId);
        if (this.imagePicked) {
          obj.append('images', this.imagePicked);
        }
        console.log(obj);
        const response = await StaffService.updateStaff(this.account.Id, obj);
        if (response) {
          this.$store.state.toast.success('Update information success');
        } else this.$store.state.toast.error('Update failed!');
      } else this.$store.state.toast.warning('Data is not changed');
    },
    checkChangeData() {
      delete this.account.department;
      delete this.account.role;
      delete this.constAccount.department;
      delete this.constAccount.role;
      return isDeepEqual(this.account, this.constAccount);
    },
  },
};
</script>

<style scoped>
img {
  display: inline-block;
  width: 40%;
  border-radius: 50%;
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
.button {
  width: 100px;
  height: 40px;
  background-color: #0ca678;
  color: #fff;
  float: right;
  border: none;
  border-radius: 10px;
}
.avatar {
  height: 300px;
  width: 300px;
}
.btn-avatar {
  display: none;
}
</style>
