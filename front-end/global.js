window.onload = function(){

  startButton = document.getElementById("begin_button");
  var params = 1;
  var correctAnswers = 0;
  startButton.addEventListener("click", function(){

    var request = new XMLHttpRequest();

    request.open("GET", "http://localhost:9292/add/question/" + 1)
    request.addEventListener("load", function(event){
      var the_request = event.target;
      userResponse = prompt(the_request.responseText);
      if(userResponse.toLowerCase() == "array"){
        alert("Correct!");
        correctAnswers++;
      }
      else{
        alert("Wrong!");
      };
    });
    request.send();
    var request = new XMLHttpRequest();

    request.open("GET", "http://localhost:9292/add/question/" + 2)
    request.addEventListener("load", function(event){
      var the_request = event.target;
      userResponse = prompt(the_request.responseText);
      if(userResponse.toLowerCase() == "objects"){
        alert("Correct!");
        correctAnswers++;
      }
      else{
        alert("Wrong!");
      };
    });
    request.send();
    var request = new XMLHttpRequest();

    request.open("GET", "http://localhost:9292/add/question/" + 3)
    request.addEventListener("load", function(event){
      var the_request = event.target;
      userResponse = prompt(the_request.responseText);
      if(userResponse.toLowerCase() == "the dom"){
        alert("Correct!");
        correctAnswers++;
      }
      else{
        alert("Wrong!");
      };
    });
    request.send();
    alert("Game Over")
    alert("You answered " + correctAnswers + " questions correctly out of 3.")
  });
};




