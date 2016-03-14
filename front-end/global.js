window.onload = function(){
  var begin = document.getElementById("beginButton");


  begin.addEventListener("click", function() {
    var request = new XMLHttpRequest();
    request.open("GET", " http://localhost:9292/combined_question_and_answer/1")

    request.addEventListener("load", function() {
      var theRequest = event.target;
      prompt(theRequest.responseText);

    });

    request.send();
  });

};