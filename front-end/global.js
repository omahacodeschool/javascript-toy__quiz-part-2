window.onload = function(){

  startButton = document.getElementById("begin_button");
  var params = 1;
  var correctAnswers = 0;
  var userResponse = "";

  startButton.addEventListener("click", function(){

    var request = new XMLHttpRequest();
    
    request.open("GET", "http://localhost:9292/add/question/" + params);
    request.addEventListener("load", function(event){
      var the_request = event.target;
      userResponse = prompt(the_request.responseText);

      var answer = new XMLHttpRequest();

      answer.open("GET", "http://localhost:9292/is_correct/"
      +params+"/"+userResponse);
      answer.addEventListener("load", function(event){
        var is_correct = event.target;
        alert(is_correct.responseText);
      });
      answer.send();      
    });
    request.send();
  });





};



      // if(userResponse.toLowerCase() == "array"){
      //   alert("Correct!");
      //   correctAnswers++;
      // }
      // else{
      //   alert("Wrong!");
