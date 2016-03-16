window.onload = function(){

  //INITIAL NECESSARY VARIABLES 
  //-------------------------------------------------------------------------------
  var ScoreCount = 0; // Variable keeps track of the number of questions correctly answered by the user.
  var currentQuestion = 0; // Variable keeps track of question the user is currently on.  
  var questionCount; // Variable will eventually keep track of the total number of questions in the database.
  var allQuestions = document.getElementById('questions'); //master div for most in-game elements
  var startButton = document.getElementById('startButton'); 
  var nextButton = document.getElementById('nextButton'); 
  var restartButton = document.getElementById('restartButton');
  var correctNotification = document.getElementById('correct');
  var wrongtNotification = document.getElementById('wrong');
  var scoreCountNotice = document.getElementById('scoreCountNotice'); //variable storing div that will be used to display number of questions answered correctly, number of remaining games, and eventually total number of games played
  var gameEnded = document.getElementById('gameEnded'); //variable storing game over notifcation
  var questionQuestion = document.getElementById('questionQuestion');
  var questionChoices = document.getElementById('questionChoices');
  //----------------------------------------------------------------------------------------------

  //FUNCTIONS
  //-----------------------------------------------------------------------------------
  //Function to query the question text from the server and sets it to questionQuestion div's inner HTML
  function getQuestion() {
    var questionRequest = new XMLHttpRequest();;
    questionRequest.open("GET", "http://localhost:9292/questions/" + currentQuestion);
    questionRequest.addEventListener("load", function(event) {
    var questionQuestion = document.getElementById('questionQuestion')
      var the_request = event.target;
      questionQuestion.innerHTML = the_request.responseText;
        // responseText is a built-in method for request objects.
    });

    questionRequest.send();
  }

  //Function to query the choices text based on the user's current question.
  function getChoices(word) {
    startButton.style.display = "none";
    submitButton.style.display = "block";

    var answerRequest = new XMLHttpRequest();
    answerRequest.open("GET", "http://localhost:9292/questions/" + currentQuestion + "/choices");
    answerRequest.addEventListener("load", function(event) {
      var questionChoices = document.getElementById('questionChoices');
      var the_request = event.target;
      var choices = JSON.parse(the_request.responseText); //parses the objext returned by the server so that it can be processed as an array in javascript.
      
      for (var choice in choices){ 
        var label = document.createElement("label");      //creates a label tag element for choice
        var choiceQuestion = document.createElement("INPUT");    //creates an input tag for choice
        choiceQuestion.setAttribute("type", "radio");                        // makes choiceQuestion a radio button
        choiceQuestion.name = "question" + currentQuestion + "Choices";    //sets the name of the button for future queries
        choiceQuestion.value = choices[choice];       //sets value for future queries when determining if selection was correct
        label.appendChild(choiceQuestion);      //appends the radio button to the label (label wraps around radio button) 
        label.appendChild(document.createTextNode(choices[choice])); //creates a text node for the label. sets element in choices array to the value
        questionChoices.appendChild(label);       //appends the label to the div that is meant to store the choices
        questionChoices.appendChild(document.createElement('br'));       //creates a line break and appends it to the div after each label has been appended. Stops each item from being listed on the same line.
      }
    });

    answerRequest.send();
  }

  // Function gets all the choices that are stored in radio buttons. 
  // Iterates through the collection of radio buttons and returns the value of the radio button that the user checked. 
  // Returns NULL if the user did not check a radio button.
  function getUserAnswer() {
    var radios = document.getElementsByName("question" + currentQuestion + "Choices");
    for (var i=0, len=radios.length; i<len; i++) {    
      if ( radios[i].checked ) {
        return radios[i].value;
      }
    }
    return null
  }

  // Function sends arguement (the user's choice selection) to the server. The server compares it with the correct answer record and returns "true" or "false" depending on if there is a match.
  function getAnswerCheck(answer) {
    var validateAnswerRequest = new XMLHttpRequest();;
    validateAnswerRequest.open("GET", "http://localhost:9292/questions/" + currentQuestion + "/choices/" + answer);
    
    validateAnswerRequest.addEventListener("load", function(event) {
      var questionQuestion = document.getElementById('questionQuestion')
      var validatedAnswerRequest = event.target;
      var validatedAnswer = validatedAnswerRequest.responseText;

      if (validatedAnswer == "true") {
       correctNotification.style.display = "block"; //displays if user's choice was correct.
       ++ScoreCount //increases user's score by 1 if the question is correct.
      } else {
        wrongtNotification.style.display ="block"; //displays if user's choice was incorrect
      }
    });

    validateAnswerRequest.send();
  }

  function startGame() {
    startButton.style.display = "none";
    getQuestion()
    getChoices()
  }


  function nextQuestion() {
    scoreCountNotice.innerHTML = "Remaining Questions: " + (questionCount - currentQuestion + 1) + "."
    scoreCountNotice.appendChild(document.createElement('br'));
    startButton.style.display = "none";
    submitButton.style.display = "block";
    wrongtNotification.style.display ="none";
    correctNotification.style.display = "none";
    $("#questionChoices").empty()
    questionQuestion.style.display = "none";
    questionChoices.style.display = "block";
    getQuestion()
    getChoices()
  }

  function endGame() {
    wrongtNotification.style.display ="none";
    correctNotification.style.display = "none";
    $("#questionChoices").empty()
    questionQuestion.style.display = "none";
    questionChoices.style.display = "block";
    startButton.innerHTML = "Play Again"
    startButton.style.display = "block";
    scoreCountNotice.innerHTML = "Correct Questions: " + ScoreCount + " -- Incorrect Questions: " + (questionCount -  ScoreCount) + " -- Final Score: " + ((parseFloat(ScoreCount) / parseFloat(questionCount)) * 100) + "%."
    gameEnded.style.display = "block"; // displays end game message
    ScoreCount = 0; // Variable keeps track of the number of questions correctly answered by the user.
    currentQuestion = 0;
  }

  function submitAndCheckChoice() {
    startButton.innerHTML = "Next"
    var userAnswer = getUserAnswer()
    if (userAnswer != null) {
      getAnswerCheck(userAnswer)
      questionQuestion.style.display = "none";
      questionChoices.style.display = "none";
      startButton.style.display = "block";
      submitButton.style.display = "none";
    } else {
    submitButton.style.display = "block";
    startButton.style.display = "none";
    }
  }
  //--------------------------------------------------------------------------


  //PROGRAM FUNCTIONALITY
  //------------------------------------------------------------------------
  // Queries server at page load to get the total number of questions in the database. 
  // Sets the returned value to questionCount. questionCount is parsed into an interger for future features
  //----------------------------------------------------
  var questionCountRequest = new XMLHttpRequest();
  questionCountRequest.open("GET", "http://localhost:9292/questions");

  questionCountRequest.addEventListener("load", function(event) {
    var questionCountResponse = event.target;
    questionCount = questionCountResponse.responseText;
    parseInt(questionCount)
    scoreCountNotice.innerHTML = "Total Questions: " + (questionCount - currentQuestion) + "."
  });

  questionCountRequest.send();
  //---------------------------------------


  startButton.addEventListener("click", function(event) { 
    ++currentQuestion
    gameEnded.style.display = "none";

    if (currentQuestion <=  0) {
      startGame()
    } else if (currentQuestion <= questionCount) {
      nextQuestion()
    } else {
      endGame()
    }
    
  });

  submitButton.addEventListener("click", function(event) {
   submitAndCheckChoice()
  });

};

//-------------------------------------------------------------------------

