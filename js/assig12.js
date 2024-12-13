var signInEmailInput = document.getElementById("signInEmail");
var signInPassInput = document.getElementById("signInPassword");
var signUpNameInput = document.getElementById("signUpName");
var signUpEmailInput = document.getElementById("signUpEmail");
var signUpPassInput = document.getElementById("signUpPassword");
var signUpContainer = []

if (localStorage.getItem('users') != null) {
    signUpContainer = JSON.parse(localStorage.getItem('users'))
}

var username = localStorage.getItem('Username')
if (username) {
    document.getElementById('username').innerHTML = "Welcome " + username
}


function isEmpty() {

    if (signUpNameInput.value == "" || signUpEmailInput.value == "" || signUpPassInput.value == "") {
        return false
    } else {
        return true
    }
}

function isEmailExist() {
    for (var i = 0; i < signUpContainer.length; i++) {
        if (signUpContainer[i].email == signUpEmailInput.value) {
            return false
        }
    }
}


function signUp() {
    if (isEmpty() == false) {
        document.getElementById('correct').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    var signUp = {
        name: signUpNameInput.value,
        email: signUpEmailInput.value,
        password: signUpPassInput.value,
    }
    if (signUpContainer.length == 0) {
        signUpContainer.push(signUp)
        localStorage.setItem('users', JSON.stringify(signUpContainer))
        document.getElementById('correct').innerHTML = '<span class="text-success m-3">Success</span>'
        return true
    }
    if (isEmailExist() == false) {
        document.getElementById('correct').innerHTML = '<span class="text-danger m-3">email already exists</span>'

    } else {
        signUpContainer.push(signUp)
        localStorage.setItem('users', JSON.stringify(signUpContainer))
        document.getElementById('correct').innerHTML = '<span class="text-success m-3">Success</span>'
    }
}

function isLoginEmpty() {

    if (signInPassInput.value == "" || signInEmailInput.value == "") {
        return false
    } else {
        return true
    }
}

function login() {
    if (isLoginEmpty() == false) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    var password = signInPassInput.value
    var email = signInEmailInput.value
    for (var i = 0; i < signUpContainer.length; i++) {
        if (signUpContainer[i].email == email && signUpContainer[i].password == password) {
            localStorage.setItem('Username', signUpContainer[i].name)
            window.location.href = './login.html'
        } else {
            document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
        }
    }

}

function logout() {
    localStorage.removeItem('Username')
    window.location.href = './signin.html'
}
