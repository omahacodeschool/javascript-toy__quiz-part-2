window.onload = function(){

  var begin_button = document.getElementById("begin_button");

  begin_button.addEventListener("click", function() {



  var request = new XMLHttpRequest();

  request.open("GET", " http://localhost:9292/combined_question_and_answer/1");
  // a request to the server running through http-server

  request.addEventListener("load", function(event){
    var the_request = event.target;
    alert(the_request.responseText);
    // responseText is a built-in method for request objects.
  });

  request.send();

});









};