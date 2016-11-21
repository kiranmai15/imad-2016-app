function signupForm(){
var signupHTML=`
             Username:<br>
               <input type="text" id="username" placeholder="enter your username" />
               <br>
                Password:<br>
                <input type="password" id="password" />
                <br>
                 <input type="submit" id="register_btn" value="Register" />
                 `;
                 document.getElementById('register_area').innerHTML = signupHtml;

var register = document.getElementById('register_btn');
    register.onclick = function () {
        alert('about to register');
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  alert('User created successfully');
                  register.value = 'Registered!';
              } else {
                  alert('Could not register the user');
                  register.value = 'Register';
              }
          }
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/create-user', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({Username: username, Password: password}));  
        register.value = 'Registering...';
    
};
}
signupForm();
