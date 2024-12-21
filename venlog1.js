let loginbtn=document.getElementById("login_btn");
let loginbtn2=document.getElementById("login_btn2");
let signup=document.getElementById("signup");
let login=document.getElementById("login");
let signinbtn=document.getElementById("signup_btn")
let signupbtn=document.getElementById('signin_btn')

loginbtn.addEventListener('click',(e)=>{
    signup.style.display='none';
    login.style.display='block';
})

loginbtn2.addEventListener('click',(e)=>{
    alert("New vendor registered")
})

signinbtn.addEventListener('click',(f)=>{
    signup.style.display='block';
    login.style.display='none';
})

signupbtn.addEventListener('click',(g)=>{
 
    let email=document.getElementById('email').value;
    let paas=document.getElementById('Password').value;
    if(localStorage.getItem(email)===paas){
        alert("Already registered");
        return;
    }
    
    localStorage.setItem(email,paas);
    alert("New Vendor Registered")
})
