window.onload = function(){

  startButton = document.getElementById("begin_button")
  startButton.addEventListener("click", function(){

    var request = new XMLHttpRequest();
    var params = 1
    request.open("GET", "http://localhost:9292/add/question/" + params)
    request.addEventListener("load", function(event){
      var the_request = event.target;
      userResponse = prompt(the_request.responseText);
      if(userResponse.toLowerCase() == "Array"){
        alert("Correct!");
      }
      else{
        alert("Wrong!");
      };
    });
    request.send();
  });
};