window.onload = function(){

// Initialization of variables
  var currentQuestion = 0,
     score = 0,
     quizLength;

  var submitter = document.getElementById('submitter');
  var nextButton = document.getElementById("nextButton");
  var begin = document.getElementById("beginButton");
  var question = document.getElementById("question");    
  var totalResult = document.getElementById("totalResult"); 
  var choices = document.getElementById("choices");


//***User clicks "begin" button to start quiz. 
//calls nextQuestion function to set up next question
  begin.addEventListener("click", function() {
    nextQuestion();
  });

//NextQuestion() Function for setting up pretty much everything for the question:

  function nextQuestion() {
  //Sets state of current question
  currentQuestion ++;       
  //New XHR Request for Question data
    var requestQuestion = new XMLHttpRequest();
    requestQuestion.open("GET", " http://localhost:9292/question/" + (currentQuestion)); 

  //New XHR request for quiz length.
    var requestQuizLength = new XMLHttpRequest();
    requestQuizLength.open("GET", " http://localhost:9292/quiz_length");       

  //New XHR request for answer data
    var requestAnswers = new XMLHttpRequest();
    requestAnswers.open("GET", " http://localhost:9292/answers/" + (currentQuestion));    


    //What to do with Question response
    requestQuestion.addEventListener("load", function() {
      var questionRequest = event.target;
      var questionText = questionRequest.responseText;
      question.innerHTML = questionText;
    });

    //What to do with Quiz length response
    requestQuizLength.addEventListener("load", function() {
      var quizLengthRequest = event.target;
      quizLength = parseInt(quizLengthRequest.responseText);
    });        

    //What to do with Answer response
    requestAnswers.addEventListener("load", function() {
      var answerRequest = event.target;
      var answerText = answerRequest.responseText;
      answerText = answerText.split(",");
      

      //Changes view once response is received
      begin.style.display = "none";
      submitter.style.display = "block";

      //Removes HTML from previous question, if there is any there.
      var node = document.getElementById('choices');
      while (node.hasChildNodes()) {
          node.removeChild(node.firstChild);
      }
      //Self-Executing function that creates labels and respective radio buttons for each answer.
      (function(){             
        answerText.forEach(function(answer) {
          var pTag = document.createElement('p');
          var label = document.createElement('label');
          label.innerHTML = answer;
          var input = document.createElement('input');
          input.type = "radio";
          input.name = "answer";
          input.value = answer;  
          choices.appendChild(pTag)
          choices.appendChild(label);
          choices.appendChild(input);
        });        
      })();
      
    });
    //sends XHR Requests as defined above
    requestQuestion.send();
    requestQuizLength.send();      
    requestAnswers.send();  
  };

  //***User Clicks 'submit' to submit answer.

  // Event Listener for Submit Button. 
  submitter.addEventListener("click", function() { 

    //HXR request for correct answer
      var requestCorrect = new XMLHttpRequest();
      requestCorrect.open("GET", " http://localhost:9292/correct_answer/" + (currentQuestion)); 

      //What to do once response is received for correct answer.
      requestCorrect.addEventListener("load", function() {      

      var correctRequest = event.target;
      var correctText = correctRequest.responseText;

      //Stores input from user as answer
      var answers = document.getElementsByName("answer");
      for (var i = 0, length = answers.length; i < length; i++) {
          if (answers[i].checked) {
            var answer = answers[i].value;
        break;
        }
      }      

      var questionResult = document.getElementById("questionResult"); 
      questionResult.style.display = "block";

      //Displays message indicating if answer is correct or not
      if (answer.toUpperCase() == correctText.toUpperCase()) {
        questionResult.innerHTML = ("That is correct!");
        score ++;

      } else {
        questionResult.innerHTML = ("Sorry. " + correctText + " is the answer!");
      }

      // If all questions have been answered, display score/percentage
      if (currentQuestion === quizLength) {
        nextButton.style.display = "none";

        var scorePercentage = (score / (quizLength) * 100);
        scorePercentage = scorePercentage.toFixed(2) + "%";

        totalResult.innerHTML = "Your score is " + score + " out of " + currentQuestion + ". (That's a " + scorePercentage + "!)";

        var node = document.getElementById('choices');

        // removes question/answer data from display
        while (node.hasChildNodes()) {
          node.removeChild(node.firstChild);
          question.style.display = "none";
          }
      } else {
        nextButton.style.display = "block";
      }     

    }); 

    requestCorrect.send();
    submitter.style.display = "none";    
  });

//User Clicks "Next" Button for next question
  //Event Listener for event button

  nextButton.addEventListener("click", function() { 
  nextButton.style.display = "none";
  nextQuestion();  
  questionResult.style.display = "none";
  });


};  
