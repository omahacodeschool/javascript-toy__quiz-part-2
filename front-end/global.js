var myRequest =  new XMLHttpRequest();
var button = document.getElementById("begin_button");
var users_response = answer.value;

//Creates a variable for the event itself
//calls the response text from variable
//stores response text in answer
function self(event){
  var the_request = event.target
  answer = prompt(the_request.responseText)
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

var
};
