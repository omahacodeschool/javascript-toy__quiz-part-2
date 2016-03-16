var myRequest =  new XMLHttpRequest();
var button = document.getElementById("begin_button");
var answer = "";

//Creates a variable for the event itself
//calls the response text from variable
//stores response text in answer
function self(event){
  var the_request = event.target
  //save prompt answer as 'answer'

  answer = prompt(the_request.responseText)

  //how do i send answer back to the server? in the URL?
  //but if i do that isnt answer just a string and not a value?
  myRequest.open("GET", "http://localhost:9292/answer");
  
  //send the request
  myRequest.send();

  //can i call the same function inside of itself?
  myRequest.addEventListener("load",self)
}

//opens a new XHR request
//sends the request
//Listens for request to load
function getText(){
  myRequest.open("GET", "http://localhost:9292/");
  myRequest.send();
  myRequest.addEventListener("load",self)
}

window.onload = function(){

button.addEventListener("click",getText);



};
