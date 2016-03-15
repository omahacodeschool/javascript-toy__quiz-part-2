window.onload = function(){

  var start_it  = document.getElementById("begin_button");
  var quizCount = 1

  start_it.addEventListener("click", function() {
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:9292/question_answer_set/" + quizCount + "");

    request.addEventListener("load", function(event) {
      var the_request = event.target;
      console.log("Question " + quizCount + ": " + the_request.responseText);
      
      var userAnswer = prompt(the_request.responseText);
      console.log("User Answer: " + userAnswer);
      quizCount++;
    });
    request.send();
  });

};