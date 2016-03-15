window.onload = function(){
  //i know we'll still need "q", our question counter variable
  var q = 1
  //and we'll still need to track our right_answers counter variable
  var right_answers = 0 
  var request = new XMLHttpRequest();
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
  hide_class_elements("q_stuff")
  hide_class_elements("a_stuff")
  //
  var begin = document.getElementById("begin_button")
  begin.addEventListener("click", function() {
    hide_class_elements("beginning_stuff")
    show_class_elements("q_stuff")
    request.open("GET", "http://localhost:9292/info");
    request.send();    
    request.addEventListener("load", function(event){
      var question_details = event.target;
      document.getElementById("question").innerHTML = question_details.responseText
    });
  }); 
  //
  var submit_guess = document.getElementById("submitter")
  submit_guess.addEventListener("click", function() {
    guess = document.getElementById("answer").value;
    request.open("GET", "http://localhost:9292/answer");
    request.send();    
    request.addEventListener("load", function(event){
      var correct_answer = event.target;
      correct_answer = correct_answer.responseText
      console.log("answer = " + guess)
      console.log("correct answer is " + correct_answer)
      if(guess === correct_answer){
        right_answers++;
        console.log("right_answers = " + right_answers);
        document.getElementById("question_result").innerHTML = "CORRECT!";
      } else {
        document.getElementById("question_result").innerHTML = "SORRY! That is INCORRECT!";
      };
      hide_class_elements("q_stuff");
      show_class_elements("a_stuff");
    });
  });
};