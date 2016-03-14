window.onload = function(){

  var begin_button = document.getElementById("begin_button");

  begin_button.addEventListener("click", function() {



  var request = new XMLHttpRequest();
    //creates a new Request Object
  request.open("GET", " http://localhost:9292/combined_question_and_answer/1");
    // specifies the path and http verb for the request, using the open method 

  request.addEventListener("load", function(event){
    var the_request = event.target;
    var userAnswer = prompt(the_request.responseText);
    // responseText is a built-in method for request objects.

    var request_answer = new XMLHttpRequest();

    request_answer.open("GET", "http://localhost:9292/check_answer/1/" + userAnswer);

    request_answer.addEventListener("load", function(event) {
      var answer_request = event.target;
      alert(answer_request.responseText);
    });

    request_answer.send();

  });

  request.send();

  });











};