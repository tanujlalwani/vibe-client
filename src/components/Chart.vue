<template>
  <div class="chart">
    <canvas id="chart--sentiment"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  props: {
    track_data: {
      default: null
    },
    data_time_frame: {
      default: "Last 6 months"
    }
  },
  data() {
    return {
      chart: null,
      options: {
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 50,
            bottom: 50
          }
        },
        title: {
          display: true,
          text: `Sentiment Analysis of Top 50 Songs: ${this.data_time_frame}`,
          fontColor: "#ffffff",
          padding: 20,
          fontSize: 24,
          fontFamily: "Inter"
        },
        legend: {
          display: true,
          labels: {
            fontColor: "#ffffff",
            padding: 20,
            fontFamily: "Inter"
          }
        },
        cutoutPercentage: 40,
        responsive: true
      }
    };
  },
  computed: {
    chart_data: function() {
      return {
        labels: ["0-15", "15-30", "30-45", "45-100"],
        datasets: [
          {
            backgroundColor: ["#00aeff", "#00ffc8", "#ffe600", "#ffae00"],
            data: this.dataset
          }
        ]
      };
    },
    dataset: function() {
      let sentiment_groups = [0, 0, 0, 0];

      if (this.track_data != null) {
        for (let i = 0; i < this.track_data.length; i++) {
          let sentiment_score = Math.floor(
            this.track_data[i].sentiment_score * 100
          );
          if (sentiment_score < 15) {
            sentiment_groups[0]++;
          } else if (sentiment_score >= 15 && sentiment_score < 30) {
            sentiment_groups[1]++;
          } else if (sentiment_score >= 30 && sentiment_score < 50) {
            sentiment_groups[2]++;
          } else if (sentiment_score >= 50) {
            sentiment_groups[3]++;
          }
        }
      }

      console.log(sentiment_groups);

      return sentiment_groups;
    }
  },
  watch: {
    chart_data: function() {
      this.updateChart("chart--sentiment", this.chart_data, this.options);
    },
    data_time_frame: function() {
      this.options.title.text = `Sentiment Analysis of Top 50 Songs: ${this.data_time_frame}`;
    }
  },
  methods: {
    createChart(chartId, chartData, options) {
      const ctx = document.getElementById(chartId);
      this.chart = new Chart(ctx, {
        type: "pie",
        data: chartData,
        options: options
      });
    },
    updateChart() {
      if (this.chart) this.chart.destroy();
      this.createChart("chart--sentiment", this.chart_data, this.options);
    }
  }
};
</script>

<style>
.chart {
  width: 100%;
  height: 55%;
}
</style>
