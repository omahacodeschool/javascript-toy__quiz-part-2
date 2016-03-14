window.onload = function(){

  startButton = document.getElementById("begin_button")
  startButton.addEventListener("click", function(){

    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:9292/add/question")
    request.addEventListener("load", function(event){
      var the_request = event.target;
      alert(the_request.responseText);
      prompt("First Answer go here");
    });
    request.send();
  });
};