<template>
  <div>
    <BarChart :chart-data="data" />
  </div>
</template>

<script>
import { BarChart } from 'vue-chart-3';
import { Chart, BarController, CategoryScale, LinearScale, BarElement } from 'chart.js';
Chart.register(BarController, CategoryScale, LinearScale, BarElement);
export default {
  components: {
    BarChart,
  },
  data() {
    return {
      dataValue: [1, 3, 4, 5, 6, 12, 4, 12, 19, 6, 10, 12],
    };
  },
  computed: {
    data() {
      return {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        datasets: [
          {
            label: 'Sales',
            data: this.dataValue,
            backgroundColor: '#6741d9',
          },
        ],
      };
    },
  },
};
</script>

<style></style>
