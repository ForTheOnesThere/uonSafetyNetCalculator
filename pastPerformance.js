//variables
var nextButton = document.getElementById("nextButton");
var secondYear = document.getElementById("yearTwoMark");
var thirdYear = document.getElementById("yearThreeMark");

//functions
function savePastPerformance(){
  window.localStorage.setItem("yearTwoMark", secondYear.value);
  window.localStorage.setItem("yearThreeMark", thirdYear.value);
}

function goToLowerModules(){
  savePastPerformance();

  if (secondYear.value != '' && thirdYear.value != ''){
    window.location.href = 'lowerLevel.html';
  } else {alert("You must not leave your marks blank!")}
}

//execute
nextButton.addEventListener("click", goToLowerModules);
