<template>
  <div>
    <DoughnutChart :chart-data="data" />
  </div>
</template>

<script>
import { DoughnutChart } from 'vue-chart-3';
import { Chart, DoughnutController, ArcElement } from 'chart.js';
Chart.register(DoughnutController, ArcElement);
export default {
  components: {
    DoughnutChart,
  },
  props: ['dataValue'],
  computed: {
    data() {
      return {
        labels: ['Cancel', 'Done'],
        datasets: [
          {
            data: this.dataValue,
            backgroundColor: ['#fa5252', '#82c91e'],
          },
        ],
      };
    },
  },
};
</script>

<style></style>
