function signupForm(){
  
     var ni = document.getElementById('register_area');
     var newdiv = document.createElement('div');
      newdiv.innerHTML = `
       First name<br>
        <input type="text" id="firstname" placeholder="enter your name" />
        <br>
         Surname<br>
        <input type="text" id="lastname" placeholder="enter your surname" />
        <br>
         Email Address<br>
        <input type="text" id="email" placeholder="email@gmail.com" />
        <br>
      Username<br>
        <input type="text" id="username" placeholder="username" />
        <br>
        Password<br>
        <input type="password" id="password" />
        <br/><br/>
       <input type="submit" id="register_btn" value="Register" />
      `;
      ni.appendChild(newdiv);
       

 var register = document.getElementById('register_btn');
    register.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
       if (username === '' || password === '') {
        // Inform the user on the screen through some message or give him a alert message
        alert("Username/Password field can't be left empty");
        return;
    }
             else if (request.status === 200) {
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
        var firstname = document.getElementById('firstname').value;
        var lastname = document.getElementById('lastname').value;
        var email = document.getElementById('email').value;
        console.log(username);
        console.log(password);
        console.log(firstname);
         console.log(lastname);
        console.log(email);
        request.open('POST', '/create-user', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password, firstname: firstname, lastname: lastname, email: email}));  
        register.value = 'Registering...';
    
};
}
signupForm();
