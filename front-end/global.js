window.onload = function(){

  var start_it      = document.getElementById("begin_button");
  var quiz          = document.getElementById("quiz");
  var question      = document.getElementById("question");
  var choices       = document.getElementById("choices");
  var submit_it     = document.getElementById("submit_button");
  var q_result      = document.getElementById("question_result");
  var next_it       = document.getElementById("next_button");
  var que_class     = document.getElementsByClassName("que");
  var result_class  = document.getElementsByClassName("que_result");
  var score_class   = document.getElementsByClassName("score");
  var restart_it    = document.getElementById("restart_button");
  var questionCount = 1
  var winCount      = 0

  start_it.addEventListener("click", function() {
    start_it.style.display       = "none";
    for (var i = 0; i < que_class.length; i++) {
      que_class[i].style.display = "block";
    }

    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:9292/question_answer_set/" + questionCount + "");

    request.addEventListener("load", function(event) {
      var question_request = event.target;

      question.innerHTML = question_request.responseText
      console.log("Question " + questionCount + ": " + question_request.responseText);
    });   
    request.send();
  });

  submit_it.addEventListener("click", function() {
    for (var i = 0; i < que_class.length; i++) {
      que_class[i].style.display    = "none";
    }
    for (var i = 0; i < result_class.length; i++) {
      result_class[i].style.display = "block";
    }

    var userAnswer = document.getElementById("answer").value;
    console.log("User Answer: " + userAnswer);

    var submit = new XMLHttpRequest();
    submit.open("GET", "http://localhost:9292/answer_check/" + questionCount + "/" + userAnswer + "");

    submit.addEventListener("load", function(event) {
    var answer_request = event.target;

    question_result.innerHTML = answer_request.responseText;
    console.log(answer_request.responseText);
    
      if (answer_request.responseText.includes("correct")) {
        winCount++
      } else {
      }
    });
    submit.send();

    document.getElementById("answer").value = ""
    questionCount++
  });

  next_it.addEventListener("click", function() {
    if (questionCount <= 4) {
      for (var i = 0; i < que_class.length; i++) {
        que_class[i].style.display = "block";
      }
      for (var i = 0; i < result_class.length; i++) {
        result_class[i].style.display = "none";
      }

      var request = new XMLHttpRequest();
      request.open("GET", "http://localhost:9292/question_answer_set/" + questionCount + "");

      request.addEventListener("load", function(event) {
        var question_request = event.target;

        question.innerHTML = question_request.responseText
        console.log("Question " + questionCount + ": " + question_request.responseText);
      });   
      request.send();

    } else {
      for (var i = 0; i < score_class.length; i++) {
        score_class[i].style.display  = "block";
      }
      for (var i = 0; i < result_class.length; i++) {
        result_class[i].style.display = "none";
      }

      total_result.innerHTML = ("You've answered " + ((winCount / 4) * 100) + "% correctly!");
      console.log("Win Ratio: " + winCount + ":" + 4);
    }
  });

  restart_it.addEventListener("click", function() {
    var restart = new XMLHttpRequest();
    restart.open("GET", "http://localhost:9292/");
    restart.send();
  });

};