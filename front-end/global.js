window.onload = function(){

  current_question = 1
  var getQuestion = new XMLHttpRequest();
  var showQuestion = document.getElementById("question")

  getQuestion.open("GET", "http://localhost:9292/get/question/" + current_question)
  getQuestion.addEventListener("load", function(question){
    var theQuestion = question.target;
    showQuestion.innerHTML = theQuestion.responseText;
  });

  getQuestion.send();

  var getAnswers = new XMLHttpRequest();
  var showAnswers = document.getElementById("choices")
  getAnswers.open("GET", "http://localhost:9292/get/answers/" + current_question)
  getAnswers.addEventListener("load", function(answer){
    var theAnswers = answer.target;
    showAnswers.innerHTML = theAnswers.responseText;
  });

  getAnswers.send();


};


