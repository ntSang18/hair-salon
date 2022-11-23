<template>
  <div class="content container padding-left-right">
    <Title title="Salary" />

    <div class="d-flex justify-content-between" style="margin-bottom: 30px">
      <div>
        <el-select v-model="searchRole" class="w-25">
          <el-option v-for="item in roleOption" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="searchMonth" style="width: 100px; margin-left: 30px">
          <el-option v-for="item in monthOption" :key="item" :label="item" :value="item" />
        </el-select>
        <el-select v-model="searchYear" style="width: 100px; margin-left: 30px">
          <el-option v-for="item in yearOption" :key="item" :label="item" :value="item" />
        </el-select>
      </div>
      <div class="budget">BUDGET: {{ convertCurrency(budget) }}</div>
    </div>
    <div>
      <el-table ref="multipleTableRef" :data="wages" border>
        <el-table-column label="Name" width="240">
          <template #default="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column property="basicWage" sortable label="Basic Salary">
          <template #default="scope">
            {{ convertCurrency(scope.row.basicWage) }}
          </template>
        </el-table-column>
        <el-table-column property="totalBills" sortable label="Bill" width="140px">
          <template #default="scope">
            {{ scope.row.totalBills || '_' }}
          </template>
        </el-table-column>
        <el-table-column property="bonusPerBill" sortable label="BonusPerBill">
          <template #default="scope">
            {{ convertCurrency(scope.row.bonusPerBill * scope.row.totalBills) }}
          </template>
        </el-table-column>
        <el-table-column property="totalWage" sortable label="Total Salary">
          <template #default="scope">
            {{ convertCurrency(scope.row.totalWage) }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Title from '@/components/admin/Title';
import StaffService from '@/services/StaffService';
export default {
  components: {
    Title,
  },
  data() {
    return {
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
      monthOption: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      yearOption: [2022, 2023, 2024, 2025],
      searchRole: '',
      searchMonth: null,
      searchYear: null,
      wages: [],
      budget: 0,
    };
  },
  watch: {
    searchMonth() {
      this.wages = [];
      this.getWages();
    },
    searchYear() {
      this.wages = [];
      this.getWages();
    },
    searchRole() {
      this.wages = [];
      this.getWages();
    },
  },
  mounted() {
    const date = new Date();
    this.searchMonth = date.getMonth() + 1;
    this.searchYear = date.getFullYear();
    this.getWages();
  },
  methods: {
    async getWages() {
      const response = await StaffService.getWage(this.searchMonth, this.searchYear, this.searchRole);
      if (response && response.data) {
        this.wages = response.data.staffs.map(el => {
          let wages = {};
          if (!el.wages.wage) {
            wages.totalWage = el.basicWage;
            wages.bonusPerBill = 0;
            wages.totalBills = 0;
          } else {
            wages.totalWage = el.wages.wage;
            wages.totalBills = el.wages.totalBills;
            wages.bonusPerBill = el.wages.bonusPerBill;
          }
          return {
            ...el,
            ...wages,
          };
        });
        this.budget = this.wages.reduce((a, b) => a + b.totalWage, 0);
      }
    },
    convertCurrency(vnd) {
      if (vnd == 0) return '_';
      else {
        return vnd.toLocaleString('vi', { style: 'currency', currency: 'VND' });
      }
    },
  },
};
</script>

<style scoped>
.budget {
}
</style>
