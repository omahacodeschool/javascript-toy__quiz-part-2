window.onload = function(){

  current_question = 1;
  var getQuestion = new XMLHttpRequest();
  var showQuestion = document.getElementById("question");
  var currentScore = 0

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
      if(userResponse.responseText == "That is correct."){
        currentScore++;
      };
    });
    console.log("current score is "+currentScore)
    console.log("about to send answer")
    sendAnswer.send();
  });
 //------------------------------------------------------------------- 
  nextQuestion = document.getElementById("next")
  nextQuestion.addEventListener("click", function(){
    if(current_question < 4){
      current_question++
      document.getElementById("question_result").innerHTML = "";
      document.getElementById("answer").value = "";

      getQuestion.open("GET", "http://localhost:9292/get/question/" + current_question)
      getQuestion.send();
      getAnswers.open("GET", "http://localhost:9292/get/answers/" + current_question);
      getAnswers.send();
    }
    else{
      alert("Game Over!")
      alert("You scored "+currentScore+" out of 4.")
    };

    // sendAnswer.open("GET", "http://localhost:9292/is_correct/"+current_question+"/"+userAnswer);
    // sendAnswer.send();
  });
};


