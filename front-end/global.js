window.onload = function(){
  var begin_button = document.getElementById("begin_button");
  begin_button.addEventListener("click", function(){
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:9292/combined_question_and_answer");

    request.addEventListener("load", function(event){
      var the_request = event.target
      prompt(the_request.responseText);
    });

    request.send();



  })
};