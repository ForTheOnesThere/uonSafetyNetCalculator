var yearValue = document.getElementById("yearValue");

var proceed = document.getElementById("yearNext");

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

proceed.addEventListener("click", continueToNext);
