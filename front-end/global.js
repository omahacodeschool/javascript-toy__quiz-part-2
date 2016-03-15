window.onload = function(){

  var start_it      = document.getElementById("begin_button");
  var questionCount = 1
  var winCount      = 0

  start_it.addEventListener("click", function() {
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:9292/question_answer_set/" + questionCount + "");

    request.addEventListener("load", function(event) {
      var question_request = event.target;
      console.log("Question " + questionCount + ": " + question_request.responseText);
      
      var userAnswer = prompt(question_request.responseText);
      console.log("User Answer: " + userAnswer);
      ;

      var submit = new XMLHttpRequest();
      submit.open("GET", "http://localhost:9292/answer_check/" + questionCount + "/" + userAnswer + "");

      submit.addEventListener("load", function(event) {
      var answer_request = event.target;

      alert(answer_request.responseText);
      console.log(answer_request.responseText);
      });
      submit.send();
    });
    request.send();
    // questionCount++
  });
};