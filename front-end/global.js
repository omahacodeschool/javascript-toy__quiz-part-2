window.onload = function(){

var begin = document.getElementById('begin_button');

begin.addEventListener("click", function() {
  var qna_request = new XMLHttpRequest();

  qna_request.open("get", "http://localhost:9292/question_and_choices/1");
  qna_request.addEventListener("load", function(event){
    var the_qna_request = event.target;
    prompt(the_qna_request.responseText);

  });

qna_request.send();

});


// var request = new XMLHttpRequest();

// request.open("GET", "http://localhost:8080/info");
// // a request to the server running through http-server

// request.addEventListener("load", function(event){
//     var the_request = event.target;
//     alert(the_request.responseText);
//     // responseText is a built-in method for request objects.
// });

// request.send();





};