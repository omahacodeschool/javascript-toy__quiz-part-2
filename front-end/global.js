window.onload = function(){

  var button = document.getElementById("begin_button");

  button.addEventListener("click", function(){

    var request = new XMLHttpRequest();

    request.open("GET", "http://localhost:9292/combined_question_and_answer/1");

    // request.addEventListener("load", function() {
    //   var a_request = event.target;
    //   alert(a_request.responseText)
    // });

    request.send();

    request.addEventListener("load", function(event){
      var ua = event.target.response // event.responseText

      document.getElementById("question").innerHTML = ua

    });
  });
}; 