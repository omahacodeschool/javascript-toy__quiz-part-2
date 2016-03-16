  //New XHR request for quiz length.
    var requestQuizLength = new XMLHttpRequest();
    requestQuizLength.open("GET", " http://localhost:9292/quiz_length");     

    //What to do with Quiz length response
    requestQuizLength.addEventListener("load", function() {
      var quizLengthRequest = event.target;
      quizLength = quizLengthRequest.responseText;

    });    

    requestQuizLength.send();  