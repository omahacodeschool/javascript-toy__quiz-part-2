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
  var question_number = 0


  begin_button.addEventListener("click", function(){
    begin_button.style.display = "none";
    quiz.style.display = "block";
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:9292/combined_question_and_answer/1");

    request.addEventListener("load", function(event){
      var the_request = event.target;
      choices.innerHTML = the_request.responseText
      var response = document.getElementById("answer").value;

      var next = new XMLHttpRequest();
      next.open("GET", "http://localhost:9292/correct_answer/1/" + response);

      next.addEventListener("load", function(event){
        var the_answer = event.target;
        question_result.innerHTML = the_answer.responseText;
      });

      next.send();
    });

    request.send();

    
    });
};


  //   submit_button.addEventListener("click", function(){


  //     if (answer == hashQuestionsAndAnswers[hash_key][0]){
  //         alert("You answered correctly");
  //         correct_answers += 1;
  //         question_number += 1;

  //         console.log("correct_answers is " + correct_answers);
  //         console.log("question_number is " + question_number);
  //     }

  //     else {
  //         console.log("hashQuestionsAndAnswers[hash_key][0] is " + hashQuestionsAndAnswers[hash_key][0]);
  //         alert("WRONG. The correct answer is " + hashQuestionsAndAnswers[hash_key][0]);
  //         question_number += 1;
  //         console.log("question_number is " + question_number);
  //     }

  //   });


  // console.log("Adding event listenerfor next_button...");
  // next_button.addEventListener("click", function(){
  //   console.log("Heard a 'click' on next_button!");

  //   var hash_key = Object.keys(hashQuestionsAndAnswers)[question_number];
  //   console.log("hash_key is " + hash_key);

  //       if (hash_key != undefined) {
  //         question_text.innerHTML = hash_key;

  //         console.log("hashQuestionsAndAnswers[hash_key] is " + hashQuestionsAndAnswers[hash_key]);
  //         choices.innerHTML = hashQuestionsAndAnswers[hash_key];
  //       }

  //         else if (hash_key == undefined) {

  //         result.innerHTML = ("You got" + correct_answers + "out of" + Object.keys(hashQuestionsAndAnswers).length + "answers correct");
  //           result.display = "block";

  //         }
