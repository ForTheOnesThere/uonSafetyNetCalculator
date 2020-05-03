let A = Number(window.localStorage.formulaA);
let B = Number(window.localStorage.formulaB);
let C = Number(window.localStorage.formulaC);
let secondYearMark = Number(window.localStorage.yearTwoMark);
let thirdYearMark = Number(window.localStorage.yearThreeMark);

//hides the labels on all of the graphs
Chart.defaults.global.legend.display = false;

//clear the data from localStorage
//window.localStorage.clear();
let canvasPie = document.getElementById('pieChartContainer');
canvasPie.height = window.innerHeight * 0.5;
canvasPie.width = window.innerWidth;

let canvasBar = document.getElementById('barChartContainer');
canvasBar.height = window.innerHeight * 0.5;
canvasBar.width = window.innerWidth;

var lambda = null;
let finalMark = null;
let classification = null;
let result = null;

function findSafetyMark(){
    if (2*A > 120){lambda=1} else {lambda = (2*A/120).toFixed(1)}

    finalMark = (B*lambda) + ((1-lambda)*C);
    finalMarkRounded = finalMark.toFixed(2);
}

function findSafetyClassification(){
  result = (secondYearMark*0.2)+(thirdYearMark*0.4)+(finalMark*0.4);

  if (50<=result && result<60){classification = '2:2'}
  else if (60<=result && result<70) {classification = '2:1'}
  else if (result>69) {classification = 'First'}
  else (classification = 'Not reached 2:2')
}

findSafetyMark();
findSafetyClassification();
let lastYearCont = ((1-lambda)*100);
let thisYearCont = lambda*100;
let contributions = [thisYearCont, lastYearCont];

document.querySelectorAll('div')[0].innerHTML = "<h2>" + finalMarkRounded + "</h2>"
document.querySelectorAll('div')[1].innerHTML = "<h2>" + classification + "</h2>"

// Using chart.js
// defines the axis range for the bar chart
Chart.scaleService.updateScaleDefaults('linear', {
    ticks: {
        min: 0,
        max: 100
    }
});

//adds a pie chart
var ctx = document.getElementById('pieChartContainer');
let dataPie = {
    datasets: [{
        data: contributions,
        backgroundColor: ['rgba(188, 141, 160, 1)','rgba(173, 188, 165, 1)']
    }
  ],
  labels: [
     "Contribution of your grades from this year so far",
      "Contribution of your performance from previous years"]};

var myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: dataPie,
});

//adds a bar chart
let dataBar = {
      labels: ["Final Overall Grade"],
      datasets: [
        {
          data: [result],
          backgroundColor: ['rgba(204,139,134,1)']
        }
      ]
    };

var ctxBar = document.getElementById('barChartContainer');
var myBarChart = new Chart(ctxBar, {
    type: 'bar',
    data: dataBar
});
