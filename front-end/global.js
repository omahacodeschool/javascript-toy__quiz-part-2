window.onload = function(){
  var begin_button = document.getElementById("begin_button");
  begin_button.addEventListener("click", function(){
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:9292/combined_question_and_answer/1");

    request.addEventListener("load", function(event){
      var the_request = event.target;
      var response = prompt(the_request.responseText);

      var next = new XMLHttpRequest();
      next.open("GET", "http://localhost:9292/correct_answer/1/" + response);

      next.addEventListener("load", function(event){
        var the_answer = event.target;
        alert(the_answer.responseText);
      });

      next.send();
    });

    request.send();

    
    });
};