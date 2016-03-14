window.onload = function(){

var begin = document.getElementById('begin_button');

begin.addEventListener("click", function() {
  var question_request = new XMLHttpRequest();

  question_request.open("get", "http://localhost:9292/question/1");
  question_request.addEventListener("load", function(event){
    var the_question_request = event.target;
    alert(the_question_request.responseText);

  });

question_request.send();

});





};