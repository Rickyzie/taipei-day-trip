class ModalController {
    constructor(){

    }

    getLoginFormData(){
        const loginForm = document.getElementById('LoginForm');
        const loginFormData = new FormData(loginForm);
        return loginFormData;
    }

    getSignupFormData(){
        const signupForm = document.getElementById('SignupForm');
        const signupFormData = new FormData(signupForm);
        return signupFormData;
    }

    ChangeModalToSignupHandler(){
        const loginModalSignup = document.querySelector('.ChangeModalToSignup');
        loginModalSignup.addEventListener("click", ()=>{
            this.ChangeToggleBox()
        })
    }

    ChangeModalToLoginHandler(){
        const loginModalLogin = document.querySelector('.ChangeModalToLogin');
        loginModalLogin.addEventListener("click", ()=>{
            this.ChangeToggleBox()
        })
    }

    CloseButtonHandler(){
        const closeButton = document.querySelector('.Modal');
        closeButton.addEventListener("click", ()=>{
            document.querySelector('.Modal').classList.remove("show");
            document.querySelector('.BlackCover').classList.remove("show");
        });
    }

    ChangeToggleBox(){
        const loginToggleBox = document.querySelector('.Login.ToggleBox');
        const signupToggleBox = document.querySelector('.Siginup.ToggleBox')
        
        if (loginToggleBox.classList.contains("show")){
            loginToggleBox.classlist.remove("show");
            signupToggleBox.classlist.add("show");
        }else{
            loginToggleBox.classlist.add("show");
            signupToggleBox.classlist.remove("show");
        }
    }
}

