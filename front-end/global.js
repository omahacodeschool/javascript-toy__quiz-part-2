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
  var chioces = document.getElementById("chioces");
  
  var answer = new XMLHttpRequest();
    answer.open("get", "http://localhost:9292/answers/"+ count);
    
  answer.addEventListener("load", function(event){
  var the_answer = event.target;
    var answer_response = the_answer.responseText;
    chioces.innerHTML = answer_response; 
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

    var chioces = document.getElementById("chioces");
    
    var answer = new XMLHttpRequest();
      answer.open("get", "http://localhost:9292/answers/"+ count);
      
    answer.addEventListener("load", function(event){
    var the_answer = event.target;
      var answer_response = the_answer.responseText;
      chioces.innerHTML = answer_response; count++;
    });

    answer.send();
  });

  //Submit button
  var button = document.getElementById("submitter");

  button.addEventListener("click", function(){
    var guess = document.getElementById("answer").value;
    
    if (guess == answer_list[count]) {
      alert("Correct!"); score++;
    } else {
      alert("Incorrect"); 
    }
    
    count++;

    if(count == question_list.length) {
        alert("Thanks for playing! You got " + score + " out of " + count + " right!");
    }
  });
};

