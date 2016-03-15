window.onload = function(){
var currentChoice = 0;
var currentQuestion = 1;
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
var questionCountDiv = document.getElementById('questionCountDiv');
var questionQuestion = document.getElementById('questionQuestion');
var questionChoices = document.getElementById('questionChoices');
var totalQuestions = questions.length; 

function getQuestion() {
  currentChoice = 0;
  var questionRequest = new XMLHttpRequest();;
  questionRequest.open("GET", "http://localhost:9292/questions/" + currentQuestion);
  questionRequest.addEventListener("load", function(event) {
  var questionQuestion = document.getElementById('questionQuestion')
    var the_request = event.target;
    questionQuestion.innerHTML = the_request.responseText;
    startButton.style.display = "none";
      // responseText is a built-in method for request objects.
  });

  questionRequest.send();
}


function getChoices(word) {
  var answerRequest = new XMLHttpRequest();
  var answerForm = document.getElementById('answerForm');
  answerRequest.open("GET", "http://localhost:9292/questions/" + currentQuestion + "/choices");
  answerRequest.addEventListener("load", function(event) {
    var questionChoices = document.getElementById('questionChoices');
    var the_request = event.target;
    var choices = JSON.parse(the_request.responseText);
    startButton.style.display = "none";
    nextButton.style.display = "block";
    for (var choice in choices){
      var label = document.createElement("label");
      var choiceQuestion = document.createElement("INPUT");
      choiceQuestion.setAttribute("type", "radio");
      choiceQuestion.name = `question${currentQuestion}Choices`;
      choiceQuestion.value = choices[choice]
      label.appendChild(choiceQuestion);
      label.appendChild(document.createTextNode(choices[choice]));
      questionChoices.appendChild(label);  
      questionChoices.appendChild(document.createElement('br'));
    }
  });

  answerRequest.send();
}

startButton.addEventListener("click", function(event) { 
  getQuestion()
  getChoices()
  
});
  

//   //event listener that is triggered when next button is clicked
//   nextButton.addEventListener("click", function() {
//     ++currentQuestion // increases value of currentQuestion to get now question

//     //triggers when user has interacted with all questions in the collection
//     if (currentQuestion >= totalQuestions) {
//       allQuestions.style.display = "none"; //hides all items in parent question div
//       scoreCountNotice.innerHTML = `WINS: ${scoreCount} OUT OF TOTAL GAMES: ${totalQuestions}.` //updates scoreCountNotice with end-game stats.
//       gameEnded.style.display = "block"; // displays end game message
//       restartButton.style.display = "block"; //dispalys restart button that will refresh page so that user can play again.

//     //triggers if user has not interacted with all questions
//     } else {
//         console.log('next');
//         //updates scoreCountNotice with current game stat information
//         scoreCountNotice.innerHTML = `WINS: ${scoreCount} - REMAINING QUESTIONS: ${totalQuestions - currentQuestion}`
//         nextButton.style.display = "none"; // hides next button
//         quizLoop() // calls quiz loop function
//     }
//   });

//   //event triggers when restartButton is clicked. Only visible when user is out of questions. WIll reload the page so that user can play again.
//   restartButton.addEventListener("click", function() {
//     location.reload();
//   });
};

