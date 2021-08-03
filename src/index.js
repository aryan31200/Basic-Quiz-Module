var numOfQuestions = data[0].length;
var questionSpace = document.getElementById("questions");
var question = questionSpace.querySelector(".question-block");
var itr = 0, totalScore = 0;
printQuestion();

function printQuestion() {
  if(itr > numOfQuestions - 1) {
    answerPage();
    return;
  } 
  question.querySelector(".qq span").innerText = data[0][itr].Question;
  var options = question.querySelector(".qo");
  for(var i = 0; i < 4; i++) {
    options.getElementsByTagName("input")[i].name = itr + 1;
    options.getElementsByTagName("input")[i].checked = false;
    options.getElementsByTagName("label")[i].innerText = data[0][itr]["Option" + (i + 1)];
  }
  question.style.display = "block";
  questionSpace.appendChild(question);
}

function checkAns(event) {
  if(event.target.parentElement.parentElement.querySelector("input:checked") === null) {
    //console.log(totalScore);
    alert("Please select an option");
  }
  var question = event.target.parentElement.parentElement.querySelector("input:checked").name;
  var selectedOption = event.target.parentElement.parentElement.querySelector("input:checked").value;
  
  for(var i = 0; i < 4; i++) {
    event.target.parentElement.parentElement.querySelectorAll("input")[i].disabled = true;
  }
  
  if(data[1][question - 1] == selectedOption) {
    totalScore = totalScore + data[0][question - 1].Score;
    event.target.parentElement.querySelector(".response").style.display = "inline-block";
    event.target.parentElement.querySelector(".response").style.color = "#155841";
    event.target.parentElement.querySelector(".response").style.backgroundColor= "#D4EDDA";
    event.target.parentElement.querySelector(".response").style.border = "1px solid #28A745"
    event.target.parentElement.querySelector(".response").innerText="Correct";
  } else {
    event.target.parentElement.querySelector(".response").style.display = "inline-block";
    event.target.parentElement.querySelector(".response").style.color = "#721C24";
    event.target.parentElement.querySelector(".response").style.backgroundColor= "#F8D7DA";
    event.target.parentElement.querySelector(".response").style.border = "1px solid #c49da1"
    event.target.parentElement.querySelector(".response").innerText="Incorrect";
  }
  var nextbtn = event.target.parentElement.querySelector("button.next");
  event.target.style.display = "none";
  nextbtn.style.display = "block";  
}

function nextQues(event) {
  itr++;
  printQuestion();
  for(var i = 0; i < 4; i++) {
    event.target.parentElement.parentElement.querySelectorAll("input")[i].disabled = false;
  }
  event.target.parentElement.querySelector(".response").style.display = "none";
  var submitbtn = event.target.parentElement.querySelector("button.check");
  event.target.style.display = "none";
  submitbtn.style.display = "block";
}

function answerPage() {
  document.getElementById("answers").style.display = "block";
  document.getElementById("questions").style.display = "none";
  document.getElementById("quiz-name").innerText = "Score: "+totalScore;
  var list = document.createElement("ul");
  for(var i = 0; i < numOfQuestions; i++) {
    var list_item = document.createElement("li");
    list_item.innerHTML = data[0][i].Question + " - <span>" + data[0][i][data[1][i]] + "</span>";
    list.appendChild(list_item);
  }
  document.getElementById("answer-key").appendChild(list);
}
function restart() {
  var answer_key = document.getElementById("answer-key");
  while(answer_key.firstChild) {
    answer_key.removeChild(answer_key.firstChild);
  }
  
  document.getElementById("answers").style.display = "none";
  document.getElementById("quiz-name").innerText = "Quiz";
  totalScore = 0;
  itr = 0;
  document.getElementById("questions").style.display = "block";
  printQuestion();
}

// const ans = data[1][0];
// console.log(ans);
// console.log((data[0][0][data[1][0]]))
