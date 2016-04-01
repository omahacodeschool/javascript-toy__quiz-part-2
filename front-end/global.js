window.onload = function(){

  var button = document.getElementById("begin_button");

  button.addEventListener("click", function(){

    var request = new XMLHttpRequest();

    request.open("GET", "http://localhost:9292/combined_question_and_answer/1");

    request.send();

    request.addEventListener("load", function(event){
      var ua = event.target.response

      document.getElementById("question").innerHTML = ua
    });
  });  
  
  var submit = document.getElementById("submitter");
  
  request.open("GET", "http://localhost:9292/combined_question_and_answer/1");

  request.send();

  request.addEventListener("load", function(event){
    var ca = event.target.response

    document.getElementById("question_result").innerHTML = ca
  });  
}; 