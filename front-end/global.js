window.onload = function(){
  var begin = document.getElementById("beginButton");


  begin.addEventListener("click", function() {
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:9292/")

    request.addEventListener("load", function() {
      var theRequest = event.target;
      alert(theRequest.responseText);
    });

    request.send();
  });


};