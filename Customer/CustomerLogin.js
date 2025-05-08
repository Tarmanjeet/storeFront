import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyB_oOpHkvWT8L8u6wE0pcYXAp364LLRxh4",
    authDomain: "hyper-local-ab655.firebaseapp.com",
    projectId: "hyper-local-ab655",
    storageBucket: "hyper-local-ab655.firebasestorage.app",
    messagingSenderId: "392195243875",
    appId: "1:392195243875:web:e9887d2d68821ea7965d56"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginbtn = document.getElementById("login_btn");
const loginbtn2 = document.getElementById("login_btn2");
const signup = document.getElementById("signup");
const login = document.getElementById("login");
const signupbtn = document.getElementById("signup_btn");
const signupRedirect = document.getElementById("signup_redirect");

loginbtn.addEventListener('click', () => {
    signup.style.display = 'none';
    login.style.display = 'block';
});

signupRedirect.addEventListener('click', () => {
    signup.style.display = 'block';
    login.style.display = 'none';
});

signupbtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('Password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Signup Successful!");
            console.log("User Created: ", userCredential.user);
            signup.style.display = 'none';
            login.style.display = 'block';
        })
        .catch((error) => {
            alert(error.message);
        });
});

loginbtn2.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email_login').value;
    const password = document.getElementById('Password_login').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login Successful!");
            console.log("Logged in User: ", userCredential.user);
            window.location.href = "customer.html";
        })
        .catch((error) => {
            alert(error.message);
        });
});
