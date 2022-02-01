import Chart from 'chart.js'
Chart.defaults.global.defaultFontColor = '#555555';
Chart.defaults.scale.gridLines.color = "rgba(0,0,0,.04)";
Chart.defaults.scale.gridLines.zeroLineColor = "rgba(0,0,0,.1)";
Chart.defaults.scale.ticks.beginAtZero = true;
Chart.defaults.global.elements.line.borderWidth = 2;
Chart.defaults.global.elements.point.radius = 5;
Chart.defaults.global.elements.point.hoverRadius = 7;
Chart.defaults.global.tooltips.cornerRadius = 3;
Chart.defaults.global.legend.labels.boxWidth = 12;
import { Line, mixins } from 'vue-chartjs'

const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    //let chartData =
    //  let options =

    this.addPlugin({
      id: 'my-plugin',
      beforeDraw: function (chart) {
        console.log(chart.config.centerText);
        console.log("hi")
        alert("hi")

        chart.config.centerText = {
          display: true,
            text: "Verbindungsaufbau...",
            color: 'red'
        };

        if (chart.config.centerText && chart.config.centerText.display !== null &&
          typeof chart.config.centerText.display !== 'undefined' &&
          chart.config.centerText.display) {
          drawTotals(chart);
        }
      },
    });

    function drawTotals(chart) {

      var width = chart.chart.width,
        height = chart.chart.height,
        ctx = chart.chart.ctx;

      ctx.restore();
      var fontSize = (height / 500).toFixed(2) * 3;
      ctx.font = fontSize + "em sans-serif";
      ctx.textBaseline = "middle";
      ctx.fillStyle = chart.config.centerText.color;

      var text = chart.config.centerText.text,
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2;

      ctx.fillText(text, textX, textY);
      ctx.save();

      //chart.update();
    }

    let array1 = [];
    for (let i = 0; i < 163; i++)
      array1.push(i);

    let chartLinesBarsRadarData = {
      labels: array1, //length = 10
      datasets: [
        {
          fill: false,
          backgroundColor: 'rgba(66,165,245,.25)',
          borderColor: 'rgba(66,165,245,1)',
          data: [1],
          borderWidth: 3,
          pointRadius: 0,
          pointHoverRadius: 0,
        }
      ]
    };

    let chartLinesBarsRadarOptions = {
      elements: {
        line: {
          borderJoinStyle: 'round'
        }
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      scales: {
        xAxes: [{
          display: true,
          gridLines: {
            display: false
          }
        }],
        yAxes: [{
          display: true,
          ticks: {
            min: 1,
            max: 3,
          },
          gridLines: {
            display: false
          }
        }]
      }
    };

    this.renderChart({
      centerText: {
        display: true,
        text: "Verbindungsaufbau...",
        color: 'red'
      },
      type: 'line',
      data: chartLinesBarsRadarData,
      options: chartLinesBarsRadarOptions,
      plugins: [{
        beforeDraw: function (chart, options) {
          //..
        }
      }],
      annotation: {
        drawTime: 'beforeDatasetsDraw'
      }
    })
  }
}
