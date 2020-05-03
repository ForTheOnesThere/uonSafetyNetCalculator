// i think there should be a form with boxes for title, mark, credits etc. One
// at a time. When filled one module out, click a button to move to the next one.
// have a reset button to start over. Keep a runnig log available to the user
// for them to see what they've done so far.

var newModuleTitle = document.getElementById("newModuleTitle");
var newModuleCredits = document.getElementById("newModuleCredits");
var newModulePercent = document.getElementById('newModulePercent');
var newModuleGrade = document.getElementById('newModuleGrade');
var addModule = document.getElementById('submitButton');
var resetButton = document.getElementById('resetButton');
var finishButton = document.getElementById('finishButton');

var moduleDatabase = [];

let numberOfCredits = 0;
let formulaA = 0;
let formulaB = 0;
let formulaC = Number(window.localStorage.formulaC);

// temporarily fixed value
let yearTwo = 71.8;
let yearThree = 70.8;

function appendModuleList(newModule) {
  //adds the module to the runnign list
  moduleDatabase.push(newModule);
}

function addNewModule() {
  //creates a temporary object to grab the value of the form
  var tempModule = {};
  tempModule.title = newModuleTitle.value;
  tempModule.credits = parseInt(newModuleCredits.value);
  tempModule.percent = parseInt(newModulePercent.value);
  tempModule.grade = parseInt(newModuleGrade.value);

  //resets the text boxes for user convenience, without starting over
  resetForm(false);

  //adds the new module to the list of stored modules
  appendModuleList(tempModule);

  let message = "You have added the module: " + tempModule.title + ". You have added " + moduleDatabase.length + " modules so far.";
  alert(message);
}

function resetForm(reset) {
  //resets the text boxes for user convenience
  newModuleTitle.value = '';
  newModuleCredits.value = '';
  newModulePercent.value = '';
  newModuleGrade.value = '';

  //if the 'start over' button is calling this function, also wipe the
  //list of modules entered so far
  if (reset == true){
    moduleDatabase = [];
    alert("Progress on this page only has been wiped.");
  } else {};

}

function calculateFinalYearContribution() {
  findNumberOfCredits();
  findCreditWeightedAverage();
  window.localStorage.setItem("formulaA",formulaA);
  window.localStorage.setItem("formulaB",formulaB);
  window.localStorage.setItem("formulaC",formulaC);
  window.location.href = ("final.html");
}

function findNumberOfCredits(){
  numberOfCredits = 0;
  let i=0;

  // adds up the total credits from the module database
  for (i=0; i<moduleDatabase.length; i++){
    numberOfCredits += moduleDatabase[i].credits*moduleDatabase[i].percent/100;}

  formulaA = numberOfCredits;

}

function findCreditWeightedAverage(){
  let creditWeightedAverage = 0;
  let i=0;
  let cont = 0;

  // finds the credit weighted average of work completed so far and saves
  // it to be accessible by the whole program
  for (i=0; i<moduleDatabase.length; i++){
    cont+=moduleDatabase[i].credits*moduleDatabase[i].percent*moduleDatabase[i].grade/100;
    }
  creditWeightedAverage = cont/numberOfCredits;
  formulaB = creditWeightedAverage;
}



addModule.addEventListener("click", addNewModule);
resetButton.addEventListener("click", function(){resetForm(true)});
finishButton.addEventListener("click", calculateFinalYearContribution);
