window.onload = function(){
var click = document.getElementById('begin_button');
var params = 1;
var userData = "";


  click.addEventListener("click", function(){
    var request = new XMLHttpRequest();
  request.open("GET", "http://localhost:9292/quiz/" + params);
  request.addEventListener("load", function(event){
    var the_request = event.target;
  userData = prompt(the_request.responseText);
    var answer = new XMLHttpRequest();

  answer.open("GET", "http://localhost:9292/verify/" + params + "/" + userData);
    answer.addEventListener("load", function(event){
        var verify = event.target;
        alert(verify.responseText);
    });
    answer.send();      
    });
    request.send();
  });
};

   
  // });
  // var the_request = event.target
  //gives a variable to the instance of the request, (event.self)
  // alert(the_request.responseText);
  //alert(variable given to instance of event(.) responseText)

// request.send();
// });


//sending the request to the controller

// }




