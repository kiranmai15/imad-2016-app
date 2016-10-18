//Counter code
var button=document.getElementById('counter');

button.onclick=function(){
    // create a request
    var request = new XMLHttpRequest();
    //Capture the response and store it in a variable
    request.onreadyStateChange=function(){
      if(request.readyState === XMLHttpRequest.DONE){
          //take some action
          if(request.status === 200){
             var counter = request.responseText;
              var span=document.getElementById('count');
              span.innerHTML=counter.toString();
          }
      }
      //Not done yet
      }  
    };
    //Make a request
    request.open('GET',"http://kiranmai15.imad.hasura-app.io/counter",true);
    request.send(null);
  };
