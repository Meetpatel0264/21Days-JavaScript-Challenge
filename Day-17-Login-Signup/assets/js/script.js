 const loginBtn = document.getElementById("loginBtn");
    const signupBtn = document.getElementById("signupBtn");

    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    // TOGGLE FORMS

    signupBtn.addEventListener("click", () => {

      signupBtn.classList.add("active");
      loginBtn.classList.remove("active");

      signupForm.classList.add("active-form");
      loginForm.classList.remove("active-form");

    });

    loginBtn.addEventListener("click", () => {

      loginBtn.classList.add("active");
      signupBtn.classList.remove("active");

      loginForm.classList.add("active-form");
      signupForm.classList.remove("active-form");

    });

    // SIGNUP LOGIC

    signupForm.addEventListener("submit", (e) => {

      e.preventDefault();

      const name = document.getElementById("signupName").value.trim();
      const email = document.getElementById("signupEmail").value.trim();
      const password = document.getElementById("signupPassword").value.trim();
      const confirmPassword = document.getElementById("confirmPassword").value.trim();

      const signupMessage = document.getElementById("signupMessage");

      if(name === "" || email === "" || password === "" || confirmPassword === ""){

        signupMessage.style.color = "#ff4d4d";
        signupMessage.innerText = "Please fill all fields";
        return;

      }

      if(password.length < 6){

        signupMessage.style.color = "#ff4d4d";
        signupMessage.innerText = "Password must be at least 6 characters";
        return;

      }

      if(password !== confirmPassword){

        signupMessage.style.color = "#ff4d4d";
        signupMessage.innerText = "Passwords do not match";
        return;

      }

      let users = JSON.parse(localStorage.getItem("users")) || [];

      const existingUser = users.find(user => user.email === email);

      if(existingUser){

        signupMessage.style.color = "#ff4d4d";
        signupMessage.innerText = "Email already registered";
        return;

      }

      const user = {
        name,
        email,
        password
      };

      users.push(user);

      localStorage.setItem("users", JSON.stringify(users));

      signupMessage.style.color = "#22c55e";
      signupMessage.innerText = "Signup successful";

      signupForm.reset();

    });

    // LOGIN LOGIC

    loginForm.addEventListener("submit", (e) => {

      e.preventDefault();

      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();

      const loginMessage = document.getElementById("loginMessage");

      let users = JSON.parse(localStorage.getItem("users")) || [];

      const validUser = users.find(user => {
        return user.email === email && user.password === password;
      });

      if(validUser){

        loginMessage.style.color = "#22c55e";
        loginMessage.innerText = `Welcome, ${validUser.name}`;

        localStorage.setItem("loggedInUser", JSON.stringify(validUser));

        loginForm.reset();

      }
      else{

        loginMessage.style.color = "#ff4d4d";
        loginMessage.innerText = "Invalid email or password";

      }

    });