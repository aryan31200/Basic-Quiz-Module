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
  var inputRadio = options.getElementsByTagName("input");
  var inputLabel = options.getElementsByTagName("label");
  for(var i = 0; i < 4; i++) {
    inputRadio[i].name = itr + 1;
    inputRadio[i].checked = false;
    inputLabel[i].innerText = data[0][itr]["Option" + (i + 1)];
  }
  question.style.display = "block";
  questionSpace.appendChild(question);
}

function checkAns(event) {
  var checkedRadio = event.target.parentElement.parentElement.querySelector("input:checked");
  if(checkedRadio === null) {
    alert("Please select an option");
  }
  var question = checkedRadio.name;
  var selectedOption = checkedRadio.value;
  
  var allInputs = event.target.parentElement.parentElement.querySelectorAll("input");
  for(var i = 0; i < 4; i++) {
    allInputs[i].disabled = true;
  }
  var responseBox = event.target.parentElement.querySelector(".response");
  if(data[1][question - 1] == selectedOption) {
    totalScore = totalScore + data[0][question - 1].Score;
    responseBox.style.display = "inline-block";
    responseBox.style.color = "#155841";
    responseBox.style.backgroundColor= "#D4EDDA";
    responseBox.style.border = "1px solid #28A745"
    responseBox.innerText="Correct";
  } else {
    responseBox.style.display = "inline-block";
    responseBox.style.color = "#721C24";
    responseBox.style.backgroundColor= "#F8D7DA";
    responseBox.style.border = "1px solid #c49da1"
    responseBox.innerText="Incorrect";
  }
  var nextbtn = event.target.parentElement.querySelector("button.next");
  event.target.style.display = "none";
  nextbtn.style.display = "block";  
}

function nextQues(event) {
  itr++;
  printQuestion();
  var allInputs = event.target.parentElement.parentElement.querySelectorAll("input");
  for(var i = 0; i < 4; i++) {
    allInputs[i].disabled = false;
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
