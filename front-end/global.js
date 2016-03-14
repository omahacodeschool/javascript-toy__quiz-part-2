window.onload = function(){

  var button = document.getElementById("begin_button")

  button.addEventListener("click", function(){

    var first_question = new XMLHttpRequest();

    first_question.open("get", "http://localhost:9292/1");
    
    first_question.addEventListener("load", function(event){
    var the_request = event.target;
    alert(the_request.responseText);
    // responseText is a built-in method for request objects.
    });


    first_question.send();
  });
};