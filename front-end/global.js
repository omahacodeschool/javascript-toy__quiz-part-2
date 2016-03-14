window.onload = function(){
  //i know we'll still need "q", our question counter variable
  var q = 1
  //and we'll still need to track our right_answers counter variable
  var right_answers = 0


  var request = new XMLHttpRequest();
  request.open("GET", "http://localhost:9292/info");

  var begin = document.getElementById("begin_button")
  begin.addEventListener("click", function() {
    request.addEventListener("click", function(event){
      var the_request = event.target;
      var answer = prompt(the_request.responseText);
      console.log("something is happening?")
    });
  }); 

  request.send();
};