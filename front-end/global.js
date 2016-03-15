window.onload = function(){

// Initialization of variables
  var currentQuestion = 0,
     score = 0,
     chose;

  var submitter = document.getElementById('submitter');
  var nextButton = document.getElementById("nextButton");
  var begin = document.getElementById("beginButton");
  var answerField = document.getElementById("answer");
  var question = document.getElementById("question");    
  var totalResult = document.getElementById("totalResult"); 
  var quizLength = 4; 


// user clicks "begin" button to start quiz. 

  begin.addEventListener("click", function() {
    currentQuestion ++;
    //calls nextQuestion function to set up next question
    nextQuestion();
  });

//NextQuestion() Function for setting up pretty much everything for the question:

  function nextQuestion() {
  //HXR Request for Question data
    var requestQuestion = new XMLHttpRequest();
    requestQuestion.open("GET", " http://localhost:9292/question/" + (currentQuestion)); 

  //HXR request for answer data
    var requestAnswers = new XMLHttpRequest();
    requestAnswers.open("GET", " http://localhost:9292/answers/" + (currentQuestion));    


    //What to do with Question response
    requestQuestion.addEventListener("load", function() {
      var questionRequest = event.target;
      var questionText = questionRequest.responseText;
      question.innerHTML = questionText;
    });

    //What to do with Answer response
    requestAnswers.addEventListener("load", function() {
      var answerRequest = event.target;
      var answerText = answerRequest.responseText;
      answerText = answerText.split(",");
      

      //Changes view once response is received
      begin.style.display = "none";
      answerField.style.display = "block";
      submitter.style.display = "block";

      //Removes HTML from previous question, if there is any there.
      var node = document.getElementById('choices');
      while (node.hasChildNodes()) {
          node.removeChild(node.firstChild);
      }
      //Self-Calling function that creates a ul with list items, each filled with answer from test. This will come in handy, I believe, if I want to do other visual things with each answer in the future.

      (function(){
        var ul = document.createElement('ul');
        ul.setAttribute('id','choiceList');


        document.getElementById('choices').appendChild(ul);
        answerText.forEach(showChoices);

        function showChoices(element, index, arr) {

          var li = document.createElement('li');

          ul.appendChild(li);
          li.innerHTML = li.innerHTML + element;
        }

      })();

    });
    //sends HXR Requests as defined above
    requestQuestion.send();
    requestAnswers.send(); 
  };


  //User Clicks 'submit' to submit answer.

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
      var answer = document.getElementById("answer").value;

      var questionResult = document.getElementById("questionResult"); 
      questionResult.style.display = "block";

      //Displays message indicating if answer is correct or not
      if (answer.toUpperCase() == correctText.toUpperCase()) {
        questionResult.innerHTML = ("That is correct!");
        score ++;

      } else {
        questionResult.innerHTML = ("Sorry. " + correctText + " is the answer!");
      }

      answerField.style.display = "none";
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
          questionResult.style.display = "none";
          }
      } else {
        nextButton.style.display = "block";
      }     

    }); 

    requestCorrect.send();
    submitter.style.display = "none";
    answerField.style.display = "none";        
  });

//User Clicks "Next" Button for next question
  //Event Listener for event button

  nextButton.addEventListener("click", function() { 
  nextButton.style.display = "none";
  currentQuestion ++;
  nextQuestion();  
  questionResult.style.display = "none";
  answerField.value = "";
  });


};  
