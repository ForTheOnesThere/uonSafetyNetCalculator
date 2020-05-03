let A = Number(window.localStorage.formulaA);
let B = Number(window.localStorage.formulaB);
let C = Number(window.localStorage.formulaC);
let secondYearMark = Number(window.localStorage.yearTwoMark);
let thirdYearMark = Number(window.localStorage.yearThreeMark);

//hides the labels on all of the graphs
Chart.defaults.global.legend.display = false;


window.localStorage.clear();
let canvas = document.getElementById('chartContainer');
canvas.height = window.innerHeight * 0.5;
canvas.width = window.innerWidth;

var lambda = null;
let finalMark = null;
let classification = null;

function findSafetyMark(){
    if (2*A > 120){lambda=1} else {lambda = (2*A/120).toFixed(1)}

    finalMark = (B*lambda) + ((1-lambda)*C);
    finalMarkRounded = finalMark.toFixed(2);
}

function findSafetyClassification(){
  let result = (secondYearMark*0.2)+(thirdYearMark*0.4)+(finalMark*0.4);

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
var ctx = document.getElementById('chartContainer');
let data = {
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
    data: data,
});
