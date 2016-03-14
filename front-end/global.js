window.onload = function(){

var points_count = 0;
var current_question = 0;
var begin = document.getElementById('begin_button');
var enter = document.getElementById('submitter');

begin.addEventListener("click", function() {
  var question_request = new XMLHttpRequest();

  question_request.open("get", "http://localhost:9292/question/1");
  question_request.addEventListener("load", function(event){
    question.innerHTML = question_request.responseText
  });

  var choices_request = new XMLHttpRequest();

  choices_request.open("get", "http://localhost:9292/choices/1");
  choices_request.addEventListener("load", function(event){
    choices.innerHTML = choices_request.responseText
  });

  var correct_request = new XMLHttpRequest();

  correct_request.open("get", "http://localhost:9292/correct/1");
  correct_request.addEventListener("load", function(event){
    var correct_answer = correct_request.responseText;
    question_result.innerHTML = correct_answer

  });

  question_request.send();
  choices_request.send();
  correct_request.send();

});


// enter.addEventListener("click", function() {
//   var user_response = answer.value;

//   if (user_response == correct_answer) {
//     question_result.innerHTML = "Correct!"
//   } else {
//     question_result.innerHTML = "Incorrect."
//   }


// });





};