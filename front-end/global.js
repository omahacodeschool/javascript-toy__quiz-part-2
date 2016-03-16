window.onload = function(){
  var currentQuestion = 0;
  var questionCount;

  var questionCountRequest = new XMLHttpRequest();
  questionCountRequest.open("GET", "http://localhost:9292/questions");

  questionCountRequest.addEventListener("load", function(event) {
    var questionCountResponse = event.target;
    questionCount = questionCountResponse.responseText;
  });
  questionCountRequest.send();


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

  function getQuestion() {
    currentChoice = 0;
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


  function getChoices(word) {
    startButton.style.display = "none";
    submitButton.style.display = "block";

    var answerRequest = new XMLHttpRequest();
    var answerForm = document.getElementById('answerForm');
    answerRequest.open("GET", "http://localhost:9292/questions/" + currentQuestion + "/choices");
    answerRequest.addEventListener("load", function(event) {
      var questionChoices = document.getElementById('questionChoices');
      var the_request = event.target;
      var choices = JSON.parse(the_request.responseText);
      for (var choice in choices){
        var label = document.createElement("label");
        var choiceQuestion = document.createElement("INPUT");
        choiceQuestion.setAttribute("type", "radio");
        choiceQuestion.name = "question" + currentQuestion + "Choices";
        choiceQuestion.value = choices[choice];
        label.appendChild(choiceQuestion);
        label.appendChild(document.createTextNode(choices[choice]));
        questionChoices.appendChild(label);  
        questionChoices.appendChild(document.createElement('br'));
      }
    });

    answerRequest.send();
  }

  function getUserAnswer() {
    var radios = document.getElementsByName("question" + currentQuestion + "Choices");
    for (var i=0, len=radios.length; i<len; i++) {    
      if ( radios[i].checked ) {
        return radios[i].value;
      }
    }
    return null
  }

  function getAnswerCheck(answer) {
    var validateAnswerRequest = new XMLHttpRequest();;
    validateAnswerRequest.open("GET", "http://localhost:9292/questions/" + currentQuestion + "/choices/" + answer);
    validateAnswerRequest.addEventListener("load", function(event) {
      var questionQuestion = document.getElementById('questionQuestion')
      var validatedAnswerRequest = event.target;
      var validatedAnswer = validatedAnswerRequest.responseText;
      console.log(validatedAnswer)
      if (validatedAnswer == "true") {
       correctNotification.style.display = "block";
      } else {
        wrongtNotification.style.display ="block";
      }
    });

    validateAnswerRequest.send();
  }


  startButton.addEventListener("click", function(event) { 
    startButton.style.display = "none";
    ++currentQuestion
    getQuestion()
    getChoices()
    
  });

  submitButton.addEventListener("click", function(event) {
    nextButton.style.display = "block";
    submitButton.style.display = "none";
    var userAnswer = getUserAnswer()
    if (userAnswer != null) {
      getAnswerCheck(userAnswer)
    }
  });

  nextButton.addEventListener("click", function(event) { 

   if (currentQuestion < questionCount) {
      nextButton.style.display = "none";
      submitButton.style.display = "block";
      wrongtNotification.style.display ="none";
      correctNotification.style.display = "none";
      $("#questionChoices").empty()
      ++currentQuestion
      getQuestion()
      getChoices()
    } else {
      allQuestions.style.display = "none"; //hides all items in parent question div
      gameEnded.style.display = "block"; // displays end game message
      restartButton.style.display = "block"; //dispalys restart button that will refresh page so that user can play again.
    }
    
  });


  //event triggers when restartButton is clicked. Only visible when user is out of questions. WIll reload the page so that user can play again.
  restartButton.addEventListener("click", function() {
    location.reload();
  });

};

