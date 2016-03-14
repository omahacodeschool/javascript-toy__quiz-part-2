window.onload = function(){

  var button = document.getElementById("begin_button")

  button.addEventListener("click", function(){

    var first_question = new XMLHttpRequest();

    first_question.open("get", "http://localhost:9292");

    first_question.send();
  });
};