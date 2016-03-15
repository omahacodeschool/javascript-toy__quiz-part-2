window.onload = function(){

  var button = document.getElementById("begin_button");

  button.addEventListener("click", function(){

    var first_question = new XMLHttpRequest();

    first_question.open("get", "http://localhost:9292/1");
    
    first_question.addEventListener("load", function(event){
    var the_first_question = event.target;
      var response = the_first_question.responseText;
      prompt(response.split());
    });


    first_question.send();
  });
};