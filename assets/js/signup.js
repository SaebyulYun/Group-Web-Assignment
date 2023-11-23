/* 
Name: Shang-Yuan, Chang/ Saebyul Yun/ Kuang-I, Ho/
Group: 
Date: Nov 25, 2023 
Section: Assignmnet 2- GroupAssignment-Blog
*/
let emailInput=document.querySelector("#email");
let nameInput=document.querySelector("#login");
let passwdInput=document.querySelector("#pass");
let passwd2Input=document.querySelector("#pass2");


passwdInput.attributes.required = "required";
//create paragraph to display the error Msg returented by validateEmail()
let emailError=document.createElement('p');
//Set the class attribute of <p> element to "warning" to style the error MSg.
emailError.setAttribute("class","warning");
//append the created element to the parent of check div
document.querySelectorAll(".textfield")[0].append(emailError);

//create paragraph to display the error Msg returented by validateName()
let nameError=document.createElement('p');
//Set the class attribute of <p> element to "warning" to style the error MSg.
nameError.setAttribute("class","warning");
//append the created element to the parent of check div
document.querySelectorAll(".textfield")[1].append(nameError);

//create paragraph to display the error Msg returented by validatePasswd()
let passwdError=document.createElement('p');
//Set the class attribute of <p> element to "warning" to style the error MSg.
passwdError.setAttribute("class","warning");
//append the created element to the parent of check div
document.querySelectorAll(".textfield")[2].append(passwdError);

//create paragraph to display the error Msg returented by validatePasswd2()
let passwdError2=document.createElement('p');
//Set the class attribute of <p> element to "warning" to style the error MSg.
passwdError2.setAttribute("class","warning");
//append the created element to the parent of check div
document.querySelectorAll(".textfield")[3].append(passwdError2);


//define a global variables
let defaultMsg="";
let emailErrorMsg="X Email address should be non-empty with the formate xyz@xyz.xyz";
emailError.style.color="red";
emailError.style.fontSize="14px";
let nameErrorMsg="X User name should be non-empty and within 30 characters";
nameError.style.color="red";
nameError.style.fontSize="14px";
let passwdErrorMsg="X Password should be at least have 8 characters";
passwdError.style.color="red";
passwdError.style.fontSize="14px";
let passwdErrorMsg2="X Please retype password";
passwdError2.style.color="red";
passwdError2.style.fontSize="14px";

//method to validate email
function vaildateEmail(){
    let email = emailInput.value; // access the value of the email
    let regexp=/\S+@\S+\.\S+/; //reg. expression 
    
    if(regexp.test(email)){ //test is predefiend method to check if the entered email matches the regexp
    return defaultMsg;
    }else {
    return emailErrorMsg;
    }
}

//method to validate name
function validateName(){
    let name = nameInput.value; // access the value of the name
    if(name.length < 30 && name !== ''){
        return defaultMsg;
    }else {
    return nameErrorMsg;
    }
}

//method to validate passwd
function validatePasswd(){
    let passwd = passwdInput.value; // access the value of the passwd
    if(passwd.length >= 8 && passwd !== ''){
        return defaultMsg;
    }else {
    return passwdErrorMsg;
    }
}

//method to validate passwd2
function validatePasswd2(){
    let passwd2 = passwd2Input.value; // access the value of the passwd2
    if(passwd2===passwdInput.value && passwd2 !== ''){
        return defaultMsg;
    }else {
    return passwdErrorMsg2;
    }
}

//event handler for submit event
function validate(){
    let valid = true;//global validation 
    let emailValidation=vaildateEmail();
    let nameValidation=validateName();  
    let passwdValidation=validatePasswd();
    let passwd2Validation=validatePasswd2();
    
    if(emailValidation !==defaultMsg){
        emailError.textContent = emailValidation;
        valid = false;
    }

    if(nameValidation!==defaultMsg){
        nameError.textContent=nameValidation;
        valid=false;
    }
    nameInput.value=nameInput.value.toLowerCase();

    if(passwdValidation!==defaultMsg){
        passwdError.textContent=passwdValidation;
        valid=false;
    }

    if(passwd2Validation!==defaultMsg){
        passwdError2.textContent=passwd2Validation;
        valid=false;
    }
    return valid;
};

function redirectHome() {
    location.href = 'index1.html';
}
const form = document.getElementById("form");
form.addEventListener("submit", function(event){
    event.preventDefault();
    var valid= validate();
    console.log(valid);
    if(valid){
        return redirectHome();
    }
});
    
    



// event listner to empty the text inside the two paragraph when resent
document.querySelector("form").addEventListener("reset",resetFormError);
function resetFormError() {
    emailError.textContent=defaultMsg;
    emailInput.style.borderColor="black";
    nameError.textContent=defaultMsg;
    nameInput.style.borderColor="black";
    passwdError.textContent=defaultMsg;
    passwdInput.style.borderColor="black";
    passwdError2.textContent=defaultMsg;
    passwd2Input.style.borderColor="black";
}


//add event listner to the email if you entered correct email,the error paragraph with be empty.
emailInput.addEventListener("blur",function(){ 
    let x=vaildateEmail();
    if(x === defaultMsg){
        emailError.textContent = defaultMsg;
        emailInput.style.borderColor="black";
    }else{
        emailError.textContent=emailErrorMsg;
        emailInput.style.borderColor="red";
    }
});
//add event listner to the name if you entered correct name,the error paragraph with be empty.
nameInput.addEventListener("blur",function(){ 
    let x=validateName();
    if(x===defaultMsg){
        nameError.textContent=defaultMsg;
        nameInput.style.borderColor="black";
    }else{
        nameError.textContent=nameErrorMsg;
        nameInput.style.borderColor="red";
    }
});

//add event listner to the passwd if you entered correct passwd,the error paragraph with be empty.
passwdInput.addEventListener("blur",function(){ 
    let x=validatePasswd();
    if(x===defaultMsg){
        passwdError.textContent=defaultMsg;
        passwdInput.style.borderColor="black";
    }else{
        passwdError.textContent=passwdErrorMsg;
        passwdInput.style.borderColor="red";
    }
});

//add event listner to the passwd2 if you entered correct passwd2,the error paragraph with be empty.
passwd2Input.addEventListener("blur",function(){ 
    let x=validatePasswd2();
    if(x===defaultMsg){
        passwdError2.textContent=defaultMsg;
        passwd2Input.style.borderColor="black";
    }else{
        passwdError2.textContent=passwdErrorMsg2;
        passwd2Input.style.borderColor="red";
    }
});







