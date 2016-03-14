window.onload = function(){

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


  question_request.send();
  choices_request.send();

});


enter.addEventListener("click", function() {
  

});





};