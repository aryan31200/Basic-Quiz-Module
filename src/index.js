var numOfQuestions = prompt("Enter the number of Questions 2 - 10");
if(numOfQuestions < 2) {
  numOfQuestions = 2;
} 
if(numOfQuestions > 10) {
  numOfQuestions = 10;
}
var questionSpace = document.getElementById("questions");
var question = questionSpace.querySelector(".question-block");
for (var i = 0; i < numOfQuestions; i++) {
  var clone = question.cloneNode(true);
  document.getElementsByClassName("qq")[i].innerHTML = data[0][i].Question;
  var options = document.getElementsByClassName("qo")[i];
  var questionNum = i;
  for (var j = 0; j < 4; j++) {
    options.getElementsByTagName("input")[j].name = questionNum;
    options.getElementsByTagName("label")[j].innerText = data[0][i]["Option" + (j + 1)];
  }
  clone.style.display = "block";
  questionSpace.appendChild(clone);
}
function checkAns(event) {
  var question = event.target.parentElement.parentElement.querySelector("input:checked").name;
  var selectedOption = event.target.parentElement.parentElement.querySelector("input:checked").value;
  if(data[1][question] == selectedOption) {
    event.target.parentElement.querySelector(".response").innerText="✅Correct";
  } else {
    var correctAns = data[0][question][data[1][question]];
    event.target.parentElement.querySelector(".response").innerText="❌Incorrect, the correct answer is " + correctAns;
  }
}
// const ans = data[1][0];
// console.log(ans);
// console.log((data[0][0][data[1][0]]))
