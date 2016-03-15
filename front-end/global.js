
var score = 0;
var question = 1;
var quizQuestionCount = 0;

function getQuestionCount(){
  var question_count_request = new XMLHttpRequest();
  //this isn't very relevant at this moment, but if this were 
  //scalable and there were multiple sets of questions for different
  //quizzes, something like this would probably be needed.
  question_count_request.open("GET", "http://localhost:9292/quiz");
  question_count_request.addEventListener("load", function(event){
    var the_question_count_request = event.target;
    var question_count = the_question_count_request.responseText;
    quizQuestionCount = parseInt(question_count);
  });
  quizQuestionCount = parseInt(question_count_request.responseText);
  question_count_request.send();
  return quizQuestionCount;
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
    });
    check_answer_request.send();
    question++;
  };

  function showQuestion(){
    var question_request = new XMLHttpRequest();
    question_request.open("GET", "http://localhost:9292/question/" + question);

    question_request.addEventListener("load", function(event){
      var the_question_request = event.target;
      var question_element = document.getElementById("question");
      question_element.innerHTML = "";
      question_element.innerHTML = the_question_request.responseText;
    });
    question_request.send();
  };




window.onload = function(){

  var begin_button = document.getElementById("begin_button");

  begin_button.addEventListener("click", function(event) {
    var question_count = getQuestionCount(event);
    question_count_element = document.getElementById("question_count");
    question_count_element.innerHTML = question_count;
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