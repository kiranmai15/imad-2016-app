function signupElement(){
    
  var ni = document.getElementById('login_area');
     var newdiv = document.createElement('div');
      newdiv.innerHTML = '<a href="http://kiranmai15.imad.hasura-app.io/register">Sign up</a>';
      ni.appendChild(newdiv);
}
function loadLoginForm () {
    var loginHtml = `
    
        <input type="text" id="username" placeholder="username" />
        <input type="password" id="password" />
        <br/><br/>
       <input type="submit" id="login_btn" value="Login" />
      
        `;
  
   
        
       document.getElementById('login_area').innerHTML = loginHtml;
   // Submit username/password to login
    var submit = document.getElementById('login_btn');
    submit.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
               if (request.status === 200) {
                  console.log("user loggin in");
                  alert("Logged in Successfully");
                  loadLogin();
              }else if(request.status === 403){
                  alert("Username/Password is incorrect");
                  submit.value = 'Log in Failed';
                  signupElement();
         
              }else if(request.status === 500){
                  alert("Something went wrong on server");
                  submit.value = 'Log in Failed';
                  signupElement();
              }
              
          }  
          // Not done yet
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        submit.value = 'Logging in...';
        
    };
    
   
}

function loadLoggedInUser (username) {
    var loginArea = document.getElementById('login_area');
    loginArea.innerHTML = `
        <h3> Hi <i>${username}</i></h3>
        <div class="dropdown">
  <button onclick="myFunction()" class="dropbtn">Select a course</button>
  <div id="myDropdown" class="dropdown-content">
    <a href="http://kiranmai15.imad.hasura-app.io/article-one">Core Java</a>
    <a href="#">Operating Systems</a>
  </div>
</div>
        <a href="/logout">Logout</a>
    `;
    }
 function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadLoggedInUser(this.responseText);
            } else {
                loadLoginForm();
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}


loadLoginForm();
