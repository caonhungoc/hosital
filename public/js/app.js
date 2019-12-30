var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

var line_chart;
var chart_config;

$(document).on('scroll load', function () {
  $(this).scrollTop();
})

$(document).ready(function () {
  chartjs();
})

function chartjs() {
  chart_config = {
    type: 'line',
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [{
        label: "Temperature",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: ['rgba(221, 199, 167, .4)'],
        borderColor: ['rgba(221, 199, 167, 0.9)'],
        yAxisID: 'y-axis-1',
      }, {
        label: "Humidity",
        data: [28, 48, 40, 19, 86, 27, 90],
        backgroundColor: ['rgba(154, 196, 159, .8)'],
        borderColor: ['rgba(154, 196, 159, .9)'],
        yAxisID: 'y-axis-2',
      }]
    },
    options: {
      responsive: true,
      legend: {
        display: false
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        yAxes: [{
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
        }, {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'y-axis-2',

          gridLines: {
            drawOnChartArea: false,
          },
        }],
      }
    }
  }

  var context = document.getElementById("chart").getContext('2d');
  line_chart = new Chart(context, chart_config);
}

