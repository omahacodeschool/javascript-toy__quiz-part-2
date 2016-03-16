window.onload = function(){

  var count = 1;
  var score = 0;

  var questions = document.getElementById("questions");
  
  //Load page question
  var question = new XMLHttpRequest();
    question.open("get", "http://localhost:9292/questions/"+ count);
  question.addEventListener("load", function(event){
  var the_question = event.target;
    var question_response = the_question.responseText;
    questions.innerHTML = question_response;
  });

  question.send();

  //load page chioces
  var choices = document.getElementById("choices");
  
  var answer = new XMLHttpRequest();
    answer.open("get", "http://localhost:9292/answers/"+ count);
    
  answer.addEventListener("load", function(event){
  var the_answer = event.target;
    var answer_response = the_answer.responseText;
    choices.innerHTML = answer_response; 
  });

  answer.send();

  //next button
  var next = document.getElementById("next");

  next.addEventListener("click", function(){

    var question = new XMLHttpRequest();
      question.open("get", "http://localhost:9292/questions/"+ count);
      
    question.addEventListener("load", function(event){
    var the_question = event.target;
      var question_response = the_question.responseText;
      questions.innerHTML = question_response;
    });

    question.send();

    var choices = document.getElementById("choices");
    
    var answer = new XMLHttpRequest();
      answer.open("get", "http://localhost:9292/answers/"+ count);
      
    answer.addEventListener("load", function(event){
    var the_answer = event.target;
      var answer_response = the_answer.responseText;
      choices.innerHTML = answer_response; 
    });

    answer.send();
  });

  //Submit button
  var button = document.getElementById("submitter");

  button.addEventListener("click", function(){
    var guess = document.getElementById("answer").value;
    var question_results = document.getElementById("question_results");

    var result = new XMLHttpRequest();
    result.open("get", "http://localhost:9292/result/"+ count);
      
    result.addEventListener("load", function(event){
      var the_result = event.target;
      var result_response = the_result.responseText;
      question_results.innerHTML = result_response; 
      var correctAnswer = document.getElementById("question_results")

    if (guess == correctAnswer.innerHTML) {
      alert("Correct!"); score++;
    } else {
      alert("Incorrect"); 
    }
     debugger;
    count++;


    });

    result.send();
  });

    // var correctAnswer = document.getElementById("question_results")

    // if (guess == correctAnswer.innerHTML) {
    //   alert("Correct!"); score++;
    // } else {
    //   alert("Incorrect"); 
    // }
    
    // count++;


  // var correctAnswer = document.getElementById("question_results")

  //   if (guess == correctAnswer) {
  //     alert("Correct!"); score++;
  //   } else {
  //     alert("Incorrect"); 
  //   }
    
  //   count++;

    // if(count == question_list.length) {
    //     alert("Thanks for playing! You got " + score + " out of " + count + " right!");
    // }

};

