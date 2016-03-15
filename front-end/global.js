window.onload = function(){

  var start_it  = document.getElementById("begin_button");
  var quizCount = 1

  start_it.addEventListener("click", function() {
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:9292/question_answer_set/" + quizCount + "");

    request.addEventListener("load", function(event) {
      var the_request = event.target;
      console.log(the_request.responseText);
    });
    request.send();
  });

};