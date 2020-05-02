let A = Number(window.localStorage.formulaA);
let B = Number(window.localStorage.formulaB);
let C = Number(window.localStorage.formulaC);
let lambda = null;
let finalMark = null;

function findSafetyMark(){
    if (2*A > 120){lambda=1} else {lambda = 2*A/120}

    finalMark = (B*lambda) + ((1-lambda)*C);
    finalMarkRounded = finalMark.toFixed(2);
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
document.querySelector('div').innerHTML = "<h2>" + finalMarkRounded + "</h2>"
