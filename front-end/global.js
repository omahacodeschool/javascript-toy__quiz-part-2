window.onload = function(){
var choices = document.getElementById('choices');
var question = document.getElementById('question');
var score = 0;
var params = 1;
var click_it = document.getElementById('begin_button');
var submitter = document.getElementById('submitter');
var next = document.getElementById('next');
var result = document.getElementById('result');
var submitter = document.getElementById('submitter'); 
var total = document.getElementById('totalResult');
var answer = document.getElementById('answer');
var quiz = document.getElementById('quiz');
var questionResult = document.getElementById('questionResult');



  click_it.addEventListener("click", function() {
    click_it.style.display = "none";
    quiz.style.display = "block";
    submitter.style.display = "block";
  
    var questionBack = new XMLHttpRequest();
    questionBack.open("get", "http://localhost:9292/quiz/"+params);
    questionBack.addEventListener("load", function(event){
    question.innerHTML = questionBack.responseText;
    });

    var choiceBack = new XMLHttpRequest();
    choiceBack.open("get", "http://localhost:9292/choices/"+params);
    choiceBack.addEventListener("load", function(event){
      function choose (){
        var whichOne = document.getElementsByName("choices");
        var sample = whichOne.length
        for (i=0;i<sample;i++){
          if (whichOne[i].checked){
            whichOne[i].value = choices
          }
        }
      }
    choices.innerHTML = choiceBack.responseText;
    });

    var answerBack = new XMLHttpRequest();
    answerBack.open("get", "http://localhost:9292/answer/"+params);
    answerBack.addEventListener("load", function(event){
    correct.innerHTML = answerBack.responseText;
    });


    questionBack.send();
    choiceBack.send();
    answerBack.send();

  });

  submitter.addEventListener("click", function() {
    submitter.style.display = "none";
    next.style.display = "block";
    questionResult.style.display = "block";
    result.style.display = "block";
      

    var userData = answer.value;
    var correct = document.getElementById('correct').innerHTML;
    var question = document.getElementById('question').innerHTML;
    

    if (userData == correct) {
      questionResult.innerHTML = "Correct!";
      score++;
      result.innerHTML = "Your Score is: " + score;
      } 
    else if (userData == "") {
      questionResult.innerHTML = "Invalid Response.";
      submitter.style.display = "block";
      next.style.display = "none";
      } 
    else {
    questionResult.innerHTML = "Nope, the question: " + question + " would be better described as: " + correct ;
    }

    if (params >= 4 && userData != "") {
    submitter.style.display = "none";
    next.style.display = "none";
    result.innerHTML = "You earned a score of " + score + " out of 4 points, " + " or " + (score/4)*100 + "%.";
    }
  });

  next.addEventListener("click", function() {
    next.style.display = "none";
    submitter.style.display = "block";
    questionResult.style.display = "none";
    params++;
    answer.value = "";

    var questionBack = new XMLHttpRequest();

    questionBack.open("get", "http://localhost:9292/quiz/"+params);
    questionBack.addEventListener("load", function(event){
    question.innerHTML = questionBack.responseText;
    });

    var choiceBack = new XMLHttpRequest();

    choiceBack.open("get", "http://localhost:9292/choices/"+params);
    choiceBack.addEventListener("load", function(event){
    choices.innerHTML = choiceBack.responseText;
    });

    var answerBack = new XMLHttpRequest();

    answerBack.open("get", "http://localhost:9292/answer/"+params);
    answerBack.addEventListener("load", function(event){
    correct.innerHTML = answerBack.responseText;
    });

    result.innerHTML = "You earned " + score + " points.";

    questionBack.send();
    choiceBack.send();
    answerBack.send();
  });
};
  