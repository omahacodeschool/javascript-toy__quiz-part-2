window.onload = function(){

  current_question = 1;
  var getQuestion = new XMLHttpRequest();
  var showQuestion = document.getElementById("question");

  getQuestion.open("GET", "http://localhost:9292/get/question/" + current_question)
  getQuestion.addEventListener("load", function(question){
    var theQuestion = question.target;
    showQuestion.innerHTML = theQuestion.responseText;
  });

  getQuestion.send();

  var getAnswers = new XMLHttpRequest();
  var showAnswers = document.getElementById("choices")
  getAnswers.open("GET", "http://localhost:9292/get/answers/" + current_question);
  getAnswers.addEventListener("load", function(answer){
    var theAnswers = answer.target;
    showAnswers.innerHTML = theAnswers.responseText;
  });

  getAnswers.send();

  var showIfCorrect = document.getElementById("question_result");
  var submitAnswer = document.getElementById("submitThis");
  var sendAnswer = new XMLHttpRequest();

  submitAnswer.addEventListener("click", function(){
    var userAnswer = document.getElementById("answer").value;
    sendAnswer.open("GET", "http://localhost:9292/is_correct/"+current_question+"/"+userAnswer);
    sendAnswer.addEventListener("load", function(user){
      var userResponse = user.target;
      showIfCorrect.innerHTML = userResponse.responseText;
    });
    sendAnswer.send();
  });
 //------------------------------------------------------------------- 
  nextQuestion = document.getElementById("next")
  nextQuestion.addEventListener("click", function(){
    if(current_question < 4){
      document.getElementById("question_result").innerHTML = "";
      current_question++
      getQuestion.open("GET", "http://localhost:9292/get/question/" + current_question)
      getQuestion.send();
      getAnswers.open("GET", "http://localhost:9292/get/answers/" + current_question);
      getAnswers.send();
    }
    else{
      alert("Game Over!")
    };

    // sendAnswer.open("GET", "http://localhost:9292/is_correct/"+current_question+"/"+userAnswer);
    // sendAnswer.send();
  });
};


