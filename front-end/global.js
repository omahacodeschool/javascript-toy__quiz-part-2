window.onload = function(){
  var quiz = document.getElementById("quiz");
  var begin_button = document.getElementById("begin_button");
  var question_text = document.getElementById("question");
  var choices = document.getElementById("choices");
  // var answer = document.getElementById("answer").value;
  var submit_button = document.getElementById("submitter");
  var next_button = document.getElementById("next");
  var result = document.getElementById("total_result");
  var correct_answers = 0;
  var question_number = 1


  begin_button.addEventListener("click", function(){
    begin_button.style.display = "none";
    quiz.style.display = "block";
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:9292/combined_question_and_answer/1");

    request.addEventListener("load", function(event){
      var the_request = event.target;
      choices.innerHTML = the_request.responseText;
    });

    request.send();
  });

  submit_button.addEventListener("click", function(){
    var response = document.getElementById("answer").value;
    var submit = new XMLHttpRequest();
    submit.open("GET", "http://localhost:9292/correct_answer/"+ question_number+ "/" + response);

    submit.addEventListener("load", function(event){
      var the_answer = event.target;
      question_result.innerHTML = the_answer.responseText;
      question_result.style.display = "block";
    });

    submit.send();
  });
  

  next_button.addEventListener("click", function(){
    question_number += 1;
    question_result.style.display = "none";
    var next = new XMLHttpRequest();
    next.open("GET", "http://localhost:9292/combined_question_and_answer/" + question_number);

    next.addEventListener("load", function(event){
      var the_next_request = event.target;
      choices.innerHTML = the_next_request.responseText;
    });

    next.send();
  });

};



  


  //         else if (hash_key == undefined) {

  //         result.innerHTML = ("You got" + correct_answers + "out of" + Object.keys(hashQuestionsAndAnswers).length + "answers correct");
  //           result.display = "block";

  //         }
