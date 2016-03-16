window.onload = function(){
  //i know we'll still need "q", our question counter variable
  var q = 1
  //and we'll still need to track our right_answers counter variable
  var right_answers = 0 
  var correct_answer = ""
  var question_request = new XMLHttpRequest();
  var answer_request = new XMLHttpRequest();
  //hide_class_elements hides elements 
  //input class: "q_stuff"(question elements), "a_stuff"(answer elements)
  //or "beginning_stuff" (initial load elements)
  function hide_class_elements(class_name) {
    var array = document.getElementsByClassName(class_name)
    for (var i = array.length - 1; i >= 0; i--) {
      array[i].style.display = "none"
    };
  };
  //show_class_elements = shows elements that were hidden 
  //input class: "q_stuff"(question elements), "a_stuff"(answer elements)
  //or "beginning_stuff" (initial load elements)
  function show_class_elements(class_name){
    var array = document.getElementsByClassName(class_name)
    for (var i = array.length - 1; i >= 0; i--) {
      array[i].style.display = "block"
    }
  };
  //sets the new question from current value of q (the question counter)
  //thingstohide is the class name of what should GO AWAY when this question is set--either beginning_stuff at the start or a_stuff when coming from "next"
  function set_new_question(thingstohide){
    hide_class_elements(thingstohide)
    show_class_elements("q_stuff")
    question_request.open("GET", "http://localhost:9292/info/" + q);
    question_request.send();    
    question_request.addEventListener("load", function(event){
      var question_details = event.target;
      document.getElementById("question").innerHTML = question_details.responseText
    });
  };
  //
  function get_the_answer(guess) {
    answer_request.open("GET", "http://localhost:9292/answer/" + q);
    answer_request.send();    
    answer_request.addEventListener("load", function(event){
      correct_answer = event.target;
      correct_answer = correct_answer.responseText
      if(guess === correct_answer){
        right_answers++;
        console.log("right_answers = " + right_answers);
        document.getElementById("question_result").innerHTML = "CORRECT!";
      } else {
        document.getElementById("question_result").innerHTML = "SORRY! That is INCORRECT!";
      };
    });
  };
  //
  hide_class_elements("q_stuff")
  hide_class_elements("a_stuff")
  //
  var begin = document.getElementById("begin_button")
  begin.addEventListener("click", function() {
    set_new_question("beginning_stuff")
  }); 
  //
  var submit_guess = document.getElementById("submitter")
  submit_guess.addEventListener("click", function() {
    guess = document.getElementById("answer").value;
    get_the_answer(guess)
    console.log("answer = " + guess)
    console.log("correct answer is " + correct_answer)
    hide_class_elements("q_stuff");
    show_class_elements("a_stuff");
  });
  //
  var next_question = document.getElementById("next") 
  next.addEventListener ("click", function() {
    q++
    set_new_question("a_stuff")
    document.getElementById("answer").value = ""
    show_class_elements("q_stuff")
  });

};