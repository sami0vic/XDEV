import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAzbqVnsYtL3Bmm1jI8psWfK1UCqSgXzwc",
  authDomain: "xdev-xplatform.firebaseapp.com",
  databaseURL: "https://xdev-xplatform-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "xdev-xplatform",
  storageBucket: "xdev-xplatform.appspot.com",
  messagingSenderId: "935566646191",
  appId: "1:935566646191:web:84d85e10813f2f3cc36d5a",
  measurementId: "G-FN1G38R5QL"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const submitButton = document.getElementById("submit");
const signupButton = document.getElementById("sign-up");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const main = document.getElementById("auth");
const createacct = document.getElementById("create-acct");
const authTitle = document.getElementById("auth-title");

const signupEmailIn = document.getElementById("email-signup");
const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
const signupPasswordIn = document.getElementById("password-signup");
const confirmSignUpPasswordIn = document.getElementById("confirm-password-signup");
const createacctbtn = document.getElementById("create-acct-btn");

const returnBtn = document.getElementById("return-btn");

var email, password, signupEmail, signupPassword, confirmSignupEmail, confirmSignUpPassword;

// Check authentication state on page load
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, redirect to problems.html
    window.location.href = "index.html";
  }
});

createacctbtn.addEventListener("click", function() {
  var isVerified = true;

  signupEmail = signupEmailIn.value;
  confirmSignupEmail = confirmSignupEmailIn.value;
  if(signupEmail != confirmSignupEmail) {
      window.alert("Email fields do not match. Try again.");
      isVerified = false;
  }

  signupPassword = signupPasswordIn.value;
  confirmSignUpPassword = confirmSignUpPasswordIn.value;
  if(signupPassword != confirmSignUpPassword) {
      window.alert("Password fields do not match. Try again.");
      isVerified = false;
  }
  
  if(signupEmail == null || confirmSignupEmail == null || signupPassword == null || confirmSignUpPassword == null) {
    window.alert("Please fill out all required fields.");
    isVerified = false;
  }
  
  if(isVerified) {
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      window.alert("Success! Account created.");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      window.alert("Error occurred. Try again.");
    });
  }
});

submitButton.addEventListener("click", function() {
  email = emailInput.value;
  console.log(email);
  password = passwordInput.value;
  console.log(password);

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("Success! Welcome back!");
      // Redirect to problems.html
      window.location.href = "index.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      console.log("Error occurred. Try again.");
    });
});

signupButton.addEventListener("click", function() {
    main.style.display = "none";
    createacct.style.display = "block";
    authTitle.innerText = "Create your account";
});

returnBtn.addEventListener("click", function() {
    main.style.display = "block";
    createacct.style.display = "none";
    authTitle.innerText = "Sign in to your account";
});
