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


  begin.addEventListener("click", function() {
    var requestQuestion = new XMLHttpRequest();
    requestQuestion.open("GET", " http://localhost:9292/question/" + (currentQuestion +1));

    var requestAnswers = new XMLHttpRequest();
    requestAnswers.open("GET", " http://localhost:9292/answers/" + (currentQuestion +1));    


    requestQuestion.addEventListener("load", function() {
      var questionRequest = event.target;
      var questionText = questionRequest.responseText;
      question.innerHTML = questionText;
    });

    requestAnswers.addEventListener("load", function() {
      var answerRequest = event.target;
      var answerText = answerRequest.responseText;
      answerText = answerText.split(",");

      

      begin.style.display = "none";
      answerField.style.display = "block";

      var node = document.getElementById('choices');
      while (node.hasChildNodes()) {
          node.removeChild(node.firstChild);
      }

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

    requestQuestion.send();
    requestAnswers.send();    
  });

};  
