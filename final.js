//variables
//read data from localStorage to use on this page
let A = Number(window.localStorage.formulaA);
let B = Number(window.localStorage.formulaB);
let C = Number(window.localStorage.formulaC);
let secondYearMark = Number(window.localStorage.yearTwoMark);
let thirdYearMark = Number(window.localStorage.yearThreeMark);
let canvasPie = document.getElementById('pieChartContainer');
let canvasBar = document.getElementById('barChartContainer');
var lambda = null;
let finalMark = null;
let classification = null;
let result = null;

//functions
function findSafetyMark(){
  //calculates the final year safety mark according to the formula given by UoN
    if (2*A > 120){lambda=1} else {lambda = (2*A/120).toFixed(1)}
    finalMark = (B*lambda) + ((1-lambda)*C);
    //rounds the final mark to 2dp for display purposes
    finalMarkRounded = finalMark.toFixed(2);
}

function findSafetyClassification(){
  //determines the user's minimum degree classification and saves it
  result = (secondYearMark*0.2)+(thirdYearMark*0.4)+(finalMark*0.4);
  if (50<=result && result<60){classification = '2:2'}
  else if (60<=result && result<70) {classification = '2:1'}
  else if (result>69) {classification = 'First'}
  else (classification = 'Not reached 2:2')
}

//execute
//hides the labels on all of the graphs
Chart.defaults.global.legend.display = false;

//adjusts the sizes of the graph canvases to be more user friendly and appealing
canvasPie.height = window.innerHeight * 0.5;
canvasPie.width = window.innerWidth;
canvasBar.height = window.innerHeight * 0.5;
canvasBar.width = window.innerWidth;

//calculate the user's outcome and display on the page in the desired places
findSafetyMark();
findSafetyClassification();
document.getElementById('results').innerHTML = "<h2>" + finalMarkRounded + "</h2>"
document.getElementById('classification').innerHTML = "<h2>" + classification + "</h2>"

//formats data for later use in the pie chart
let lastYearCont = ((1-lambda)*100);
let thisYearCont = lambda*100;
let contributions = [thisYearCont, lastYearCont];

// Using chart.js
// defines the axis range for all linear scales, code from stack exchange
Chart.scaleService.updateScaleDefaults('linear', {
    ticks: {
        min: 0,
        max: 100
    }
});

//sets up the data for a pie chart to use
let dataPie = {
    datasets: [{
        data: contributions,
        backgroundColor: ['rgba(188, 141, 160, 1)','rgba(173, 188, 165, 1)']
    }],
    labels: ["Contribution of your grades from this year so far","Contribution of your performance from previous years"]
};

//instantiates a pie chart
var myDoughnutChart = new Chart(canvasPie, {
    type: 'doughnut',
    data: dataPie,
});

//sets up the data for a bar chart to use
let dataBar = {
      labels: ["Final Overall Grade"],
      datasets: [{
          data: [result.toFixed(1)],
          backgroundColor: ['rgba(204,139,134,1)']
        }]
    };

//instantiates a bar chart
var myBarChart = new Chart(barChartContainer, {
    type: 'horizontalBar',
    data: dataBar
});

//clear the user's data from localStorage
window.localStorage.clear();
