window.onload = function(){

  var begin_button = document.getElementById("begin_button");

  begin_button.addEventListener("click", function() {



  var question_request = new XMLHttpRequest();
    //creates a new Request Object
  question_request.open("GET", "http://localhost:9292/question/1");
    // specifies the path and http verb for the request, using the open method 


  question_request.addEventListener("load", function(event){
    var the_question_request = event.target;

    var question_element = document.getElementById("question");

    question_element.innerHTML = the_question_request.responseText;

    //FIND ALTERNATIVE METHOD OF GETTING ANSWER
    //var userAnswer = prompt(the_request.responseText);
    // responseText is a built-in method for request objects.

    //var request_answer = new XMLHttpRequest();

    //request_answer.open("GET", "http://localhost:9292/check_answer/1/" + userAnswer);

    //request_answer.addEventListener("load", function(event) {
      //var answer_request = event.target;
      //alert(answer_request.responseText);
    //});

    //request_answer.send();

  });

  question_request.send();

  var choices_request = new XMLHttpRequest();
    // creates a new Request Object to get the choices

    choices_request.open("GET", "http://localhost:9292/choices/1");
    //specifies the path and http verb for the choices request

  choices_request.addEventListener("load", function(event){
    var the_choices_request = event.target;
    var choices_element = document.getElementById("choices");
    var choices_list = document.createElement("p");
    var options_string = the_choices_request.responseText;
    var options_array = options_string.split("***");
    var text = "";
    for (i = 0; i < options_array.length; i++) {
    text += options_array[i] + "<br>";
  }

    choices_list.innerHTML = text;
    choices_element.appendChild(choices_list);

    //choices_list = document.createElement("OL");
      //options_list.type = "A";
      //options_list.id = "options";


  });

  choices_request.send();



  });











};