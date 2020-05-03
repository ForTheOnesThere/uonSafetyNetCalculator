//variables
var noModules = document.getElementById("noLowerModules");
var newModuleTitle = document.getElementById("newModuleTitle");
var newModuleCredits = document.getElementById("newModuleCredits");
var newModulePercent = document.getElementById('newModulePercent');
var newModuleGrade = document.getElementById('newModuleGrade');
var addModule = document.getElementById('submitButton');
var resetButton = document.getElementById('resetButton');
var continueButton = document.getElementById('continueButton');
var moduleDatabase = [];
let numberOfCredits = 0;
let lowerCredits = 0;
let yearTwoMark = Number(window.localStorage.getItem("yearTwoMark"));
let yearThreeMark = Number(window.localStorage.getItem("yearThreeMark"));

//functions
function continueToFinalYear(){
  //saves data that student has no lower modules and moves them on
  window.localStorage.setItem("formulaC", "0");
  window.location.href = "finalYear.html";
}

function appendModuleList(newModule) {
  //adds the module to the running list
  moduleDatabase.push(newModule);
}

function addNewModule() {
  //adds a new module to the database
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

  //tell the user that the operation was successful, so they can keep track of what they've added so far
  let message = "You have added the module: " + tempModule.title + ". You have added " + moduleDatabase.length + " module(s) so far.";
  alert(message);
}

function resetForm(reset) {
  //resets the text boxes for user convenience
  newModuleTitle.value = '';
  newModuleCredits.value = '';
  newModulePercent.value = '';
  newModuleGrade.value = '';

  //if the 'start over' button is calling this function, also wipe the list of modules entered so far
  if (reset == true){
    moduleDatabase = [];
    alert("Progress on this page only has been wiped.");
  } else {};
}

function calculatePenYearContribution() {
  findNumberOfCredits();
  findCreditWeightedAverage();
}

function findNumberOfCredits(){
  //calculates the number of lower credits the user has input
  numberOfCredits = 0;
  let i=0;

  // adds up the total credits from the module database
  for (i=0; i<moduleDatabase.length; i++){
    numberOfCredits += moduleDatabase[i].credits*moduleDatabase[i].percent/100;}
  //saves the data for later
  lowerCredits = numberOfCredits;
}

function findCreditWeightedAverage(){
  //finds the credit weighted average of all lower modules, whether taken this year or in previous years
  let creditWeightedAverage = 0;
  let i=0;
  let cont = 0;

  // finds the credit weighted average of work completed so far and saves
  // it to be accessible by the whole program
  for (i=0; i<moduleDatabase.length; i++){
    cont+=moduleDatabase[i].credits*moduleDatabase[i].percent*moduleDatabase[i].grade/100;
    }
  cont = cont + (120*yearTwoMark) + (120*yearThreeMark);
  creditWeightedAverage = cont/(lowerCredits+240);
  formulaC = creditWeightedAverage;
  //save the data for future pages and moves the user on
  window.localStorage.setItem("formulaC",formulaC);
  window.location.href = "finalYear.html";
}

//execute
addModule.addEventListener("click", addNewModule);
resetButton.addEventListener("click", function(){resetForm(true)});
continueButton.addEventListener("click", calculatePenYearContribution);
noModules.addEventListener("click",continueToFinalYear);
