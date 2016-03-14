window.onload = function(){
  //i know we'll still need "q", our question counter variable
  var q = 0
  //and we'll still need to track our right_answers counter variable
  var right_answers = 0

  var request = new XMLHttpRequest();


  request.open("GET", "http://localhost:9292/info");
  // a request to the server running through http-server
  
  request.addEventListener("load", function(event){
    var the_request = event.target;
    alert(the_request.responseText);
    // responseText is a built-in method for request objects.
  });
  
  request.send();
};