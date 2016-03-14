window.onload = function(){
  //i know we'll still need "q", our question counter variable
  var q = 1
  //and we'll still need to track our right_answers counter variable
  var right_answers = 0
  
  var request = new XMLHttpRequest();
  
  var answer = ""
  
  var begin = document.getElementById("begin_button")
  begin.addEventListener("click", function() {
    request.open("GET", "http://localhost:9292/info");
    request.send();    
    request.addEventListener("load", function(event){
      var the_request = event.target;
      answer = prompt(the_request.responseText);
      console.log(answer)
    // responseText is a built-in method for request objects.
    });
  }); 
  var 
};