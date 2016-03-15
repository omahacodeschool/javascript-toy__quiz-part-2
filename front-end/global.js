window.onload = function(){

var points_count = 0;
var current_question = 1;
var begin = document.getElementById('begin_button');
var enter = document.getElementById('submitter');
var next = document.getElementById('next');
var points = document.getElementById('result');
var quiz = document.getElementById('quiz');
var question_result = document.getElementById('question_result');

begin.addEventListener("click", function() {

  begin.style.display = "none";
  quiz.style.display = "block";
  enter.style.display = "block";

  var question_request = new XMLHttpRequest();

  question_request.open("get", "http://localhost:9292/question/"+current_question+"");
  question_request.addEventListener("load", function(event){
    question.innerHTML = question_request.responseText;
  });

  var choices_request = new XMLHttpRequest();

  choices_request.open("get", "http://localhost:9292/choices/"+current_question+"");
  choices_request.addEventListener("load", function(event){
    choices.innerHTML = choices_request.responseText;
  });

  var correct_request = new XMLHttpRequest();

  correct_request.open("get", "http://localhost:9292/correct/"+current_question+"");
  correct_request.addEventListener("load", function(event){
    correct_answer.innerHTML = correct_request.responseText;
  });

  points.innerHTML = "You have " + points_count + " point(s).";

  question_request.send();
  choices_request.send();
  correct_request.send();

});


enter.addEventListener("click", function() {

  enter.style.display = "none";
  next.style.display = "block";
  question_result.style.display = "block";
  points.style.display = "block";


  var user_response = answer.value;
  var correct_answer = document.getElementById('correct_answer').innerHTML;

  if (user_response == correct_answer) {
    question_result.innerHTML = "Correct!";
    points_count++;
    points.innerHTML = "You have " + points_count + " point(s).";
  } else {
    question_result.innerHTML = "Incorrect.";
  }

  if (current_question >= 4) {
    enter.style.display = "none";
    next.style.display = "none";

    result.innerHTML = "That's the end of our game--you have " + points_count + "/4 points! That's " + (points_count/4)*100 + "%."
  }


});

next.addEventListener("click", function() {

  next.style.display = "none";
  enter.style.display = "block";
  question_result.style.display = "none";

  current_question++
  answer.value=""

  var question_request = new XMLHttpRequest();

  question_request.open("get", "http://localhost:9292/question/"+current_question+"");
  question_request.addEventListener("load", function(event){
    question.innerHTML = question_request.responseText;
  });

  var choices_request = new XMLHttpRequest();

  choices_request.open("get", "http://localhost:9292/choices/"+current_question+"");
  choices_request.addEventListener("load", function(event){
    choices.innerHTML = choices_request.responseText;
  });

  var correct_request = new XMLHttpRequest();

  correct_request.open("get", "http://localhost:9292/correct/"+current_question+"");
  correct_request.addEventListener("load", function(event){
    correct_answer.innerHTML = correct_request.responseText;
  });

  points.innerHTML = "You have " + points_count + " point(s).";

  question_request.send();
  choices_request.send();
  correct_request.send();


});

};