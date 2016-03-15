var myRequest =  new XMLHttpRequest();

function self(event){
  var the_request = event.target
  prompt(the_request.responseText)
}


function getText(){
  myRequest.open("GET", "http://localhost:9292/");
  myRequest.send();
  myRequest.addEventListener("load",self)
}

window.onload = function(){

var button = document.getElementById("begin_button")
button.addEventListener("click",getText);

};
