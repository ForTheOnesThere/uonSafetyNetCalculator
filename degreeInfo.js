// variables
var yearValue = document.getElementById("yearValue");
var proceed = document.getElementById("yearNext");

// functions
function continueToNext(){
  saveYearInfo(yearValue.value);

  if (window.localStorage.year == "4"){
    window.location.href="pastPerformance.html";
  } else {
    window.location.href = "notSupported.html";
  }
}

function saveYearInfo(yearSelected) {
  window.localStorage.setItem("year",yearSelected);
}


//execute
proceed.addEventListener("click", continueToNext);
