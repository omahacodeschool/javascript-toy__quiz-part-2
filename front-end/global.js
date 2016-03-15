


function showOption(option_key, text){

    var radio = document.createElement("input");
      radio.type = "radio";
      radio.id = i;
      radio.name = "option";
    var label = document.createElement("label");
      label.htmlFor = i;
      label.innerHTML = text;
      label.appendChild(radio);
    var option_item = document.createElement("li");
      option_item.appendChild(label);
      return option_item;
  };

  function createOptionsList(){
    var i = 0;
    var options_list = document.createElement("OL");
      options_list.type = "A";
      options_list.id = ((i + 1) + "options");
  }






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
    var response_array = options_string.split("***");
    var options_array = response_array.slice(1);

    var options_list = document.createElement("OL");
      options_list.type = "A";
      options_list.id = "options";
    
    //var text = "";
    for (i = 0; i < options_array.length; i++) {
      var option = showOption((i + 1), options_array[i]);
      options_list.appendChild(option);
  }
    choices_list.innerHTML = options_array + options_array.length;

    choices_element.appendChild(options_list);
    choices_element.appendChild(choices_list);

    //choices_list = document.createElement("OL");
      //options_list.type = "A";
      //options_list.id = "options";


  });

  choices_request.send();



  });











};