window.onload = function(){

  var questions = document.getElementById("questions");
  
  var first_question = new XMLHttpRequest();
    first_question.open("get", "http://localhost:9292/questions/1");
    
  first_question.addEventListener("load", function(event){
  var the_first_question = event.target;
    var question_response = the_first_question.responseText;
    questions.innerHTML = question_response;
  });

  first_question.send();

  var chioces = document.getElementById("chioces");
  
  var answer_to_first_question = new XMLHttpRequest();
    answer_to_first_question.open("get", "http://localhost:9292/answers/1");
    
  answer_to_first_question.addEventListener("load", function(event){
  var the_answer_to_first_question = event.target;
    var answer_response = the_answer_to_first_question.responseText;
    chioces.innerHTML = answer_response;
  });

  answer_to_first_question.send();

};

