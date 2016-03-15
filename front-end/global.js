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

// sets up next/first question. Copied/pasted/modified code from part 1 phase 2
// Still needs to be heavily modified 



// user clicks "begin" button to start quiz. Code from Part 2, Phase 1 (modified)

  var begin = document.getElementById("beginButton");

// This is probably a very bad approach, but I'm trying to get the information separately. 

  //HXR request for question data
  begin.addEventListener("click", function() {
    var requestQuestion = new XMLHttpRequest();
    requestQuestion.open("GET", " http://localhost:9292/question/" + (currentQuestion +1));


  //HXR request for answer data
    var requestAnswers = new XMLHttpRequest();
    requestAnswers.open("GET", " http://localhost:9292/answers/" + (currentQuestion +1));    

  //HXR request for correct answer
    var requestCorrect = new XMLHttpRequest();
    requestCorrect.open("GET", " http://localhost:9292/answers/" + (currentQuestion +1));  


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

      //Removes HTML from previous question, if there is any there.
      var node = document.getElementById('choices');
      while (node.hasChildNodes()) {
          node.removeChild(node.firstChild);
      }
      //Self-Calling function that creates a ul with li's, each filled with answer from test.

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

    requestCorrect.send();
    requestQuestion.send();
    requestAnswers.send();    
  });

  //User Clicks 'submit' to submit answer.

  // Event Listener for Submit Button. 
  submitter.addEventListener("click", function() { 

  });

};  
