let A = Number(window.localStorage.formulaA);
let B = Number(window.localStorage.formulaB);
let C = Number(window.localStorage.formulaC);
let secondYearMark = Number(window.localStorage.yearTwoMark);
let thirdYearMark = Number(window.localStorage.yearThreeMark);
window.localStorage.clear();

let lambda = null;
let finalMark = null;
let classification = null;

function findSafetyMark(){
    if (2*A > 120){lambda=1} else {lambda = 2*A/120}

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

// using CanvasJS
window.onload = function() {

var chart = new CanvasJS.Chart("chartContainer", {
  animationEnabled: true,
  title: {
    text: "Mark Breakdown"
  },
  data: [{
    type: "pie",
    startAngle: 240,
    yValueFormatString: "##0.00\"%\"",
    indexLabel: "{label} {y}",
    dataPoints: [
      {y: lambda*100, label: "Contribution of your grades from this year so far"},
      {y: (1-lambda)*100, label: "Contribution of your performance from previous years"}
    ]
  }]
});
chart.render();

}

findSafetyMark();
findSafetyClassification();

document.querySelectorAll('div')[0].innerHTML = "<h2>" + finalMarkRounded + "</h2>"
document.querySelectorAll('div')[1].innerHTML = "<h2>" + classification + "</h2>"
