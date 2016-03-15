
var score = 0;
var question = 1;
var quizQuestionCount;


function getQuestionCount(){
  var question_count_request = new XMLHttpRequest();
  //this isn't very relevant at this moment, but if this were 
  //scalable and there were multiple sets of questions for different
  //quizzes, something like this would probably be needed.
  question_count_request.open("GET", "http://localhost:9292/quiz");
  question_count_request.addEventListener("load", function(event){
    var the_question_count_request = event.target;
    quizQuestionCount = parseInt(the_question_count_request.responseText);
    //var question_count_element = document.getElementById("question_count");
    //question_count_element.innerHTML = "Total Questions in Quiz: " + quizQuestionCount;
  });
  question_count_request.send();
};

function showOption(option_key, text){

    var radio = document.createElement("input");
      radio.type = "radio";
      radio.id = i;
      radio.name = "option";
      radio.value = text;
    var label = document.createElement("label");
      label.htmlFor = i;
      label.innerHTML = text;
      label.appendChild(radio);
    var option_item = document.createElement("li");
      option_item.appendChild(label);
      return option_item;
  };

  function createOptionsList(){
    var choices_request = new XMLHttpRequest();
    choices_request.open("GET", "http://localhost:9292/choices/" + question);

    choices_request.addEventListener("load", function(event){
    var the_choices_request = event.target;
    var choices_element = document.getElementById("choices");
    var options_string = the_choices_request.responseText;
    var response_array = options_string.split("***");
    var options_array = response_array.slice(1);


    var options_list = document.createElement("OL");
      options_list.type = "A";
      options_list.id = question + "options";

      for (i = 0; i < options_array.length; i++) {
      var option = showOption(i, options_array[i]);
      options_list.appendChild(option);
  }
    choices_element.innerHTML = "";
    choices_element.appendChild(options_list);



  });

  choices_request.send();
  };


function submitAnswer() {
    var userAnswer = document.querySelector('input[name="option"]:checked').value;
    var result = document.getElementById("question_result");
    var submitter_button = document.getElementById("submitter");
      submitter_button.style.display = "none";

    var next_q_button = document.getElementById("next");
    next_q_button.style.display = "";
    //result.innerHTML = userAnswer;
    var check_answer_request = new XMLHttpRequest();
    check_answer_request.open("GET", "http://localhost:9292/verify/" + question + "/" + userAnswer);

    check_answer_request.addEventListener("load", function(event){
      var the_check_answer_request = event.target;
      var result_display = document.getElementById("question_result");
      result_display.innerHTML = check_answer_request.responseText;
      if (check_answer_request.responseText == "CORRECT!"){
        score++;
      }

      if (question > quizQuestionCount){
        var total_result = document.getElementById("total_result");
        total_result.innerHTML = "You got " + score + " out of " + quizQuestionCount + " correct.";
        var quiz_elements = document.getElementById("quiz");
        quiz_elements.style.display = "none";
      }
    });
    check_answer_request.send();
    question++;
  };

  function showQuestion(){
    var next_q_button = document.getElementById("next");
    next_q_button.style.display = "none";
    var question_request = new XMLHttpRequest();
    question_request.open("GET", "http://localhost:9292/question/" + question);

    question_request.addEventListener("load", function(event){
      var the_question_request = event.target;
      var question_element = document.getElementById("question");
      var submit_button = document.getElementById("submitter");
      submit_button.style.display = "";
      question_element.innerHTML = "";
      question_element.innerHTML = the_question_request.responseText;
      if (question >= quizQuestionCount) {
       var next = document.getElementById("next");
       next.style.display = "none";
    }
    });
    question_request.send();
  };




window.onload = function(){

  var submitter_button = document.getElementById("submitter");
      submitter_button.style.display = "none";

  var next_q_button = document.getElementById("next");
    next_q_button.style.display = "none";

  var begin_button = document.getElementById("begin_button");

  begin_button.addEventListener("click", function(event) {
    getQuestionCount(event);    
    showQuestion(event);
    createOptionsList(event);
    event.target.style.display = "none";
  });

  var submitter = document.getElementById("submitter");

  submitter.addEventListener("click", function(submitter){
    submitAnswer(submitter);
  });
  
  var next = document.getElementById("next");

  next.addEventListener("click", function(event){
    var result_display = document.getElementById("question_result");
    result_display.innerHTML = "";
    showQuestion(event);
    createOptionsList(event);
  });












};