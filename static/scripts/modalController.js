import MemberService from "./memberService.js";
class ModalController {

    #memberService = null;
    
    constructor(){
        this.#memberService = MemberService.getInstance();

        this.LoginFormHandler();
        this.ChangeModalToSignupHandler();
        this.ChangeModalToLoginHandler();
        this.CloseButtonHandler();
    }

    LoginFormHandler(){
        const loginFormButton = document.querySelector('.LoginFormButton');
        loginFormButton.addEventListener("click", ()=>{
            const loginFormData = this.getLoginFormData();
            this.#memberService.Login(loginFormData);
        })

    }

    ChangeModalToSignupHandler(){
        const changeModalToSignup = document.querySelector('.ChangeModalToSignup');
        changeModalToSignup.addEventListener("click", ()=>{
            this.ChangeToggleBox();
        })
    }

    ChangeModalToLoginHandler(){
        const changeModalToLogin = document.querySelector('.ChangeModalToLogin');
        changeModalToLogin.addEventListener("click", ()=>{
            this.ChangeToggleBox();
        });
    }

    CloseButtonHandler(){
        const closeButton = document.querySelector('.CloseButton');
        closeButton.addEventListener("click", ()=>{
            this.CloseModal();
        });
    }

    OpenModal(){
        document.querySelector('.Modal').classList.add("show");
        document.querySelector('.BlackCover').classList.add("show");
    }

    CloseModal(){
        document.querySelector('.Modal').classList.remove("show");
        document.querySelector('.BlackCover').classList.remove("show");
    }

    ChangeToggleBox(){
        const loginToggleBox = document.querySelector('.Login.ToggleBox');
        const signupToggleBox = document.querySelector('.Signup.ToggleBox');
        if (loginToggleBox.classList.contains("show")){
            loginToggleBox.classList.remove("show");
            signupToggleBox.classList.add("show");
        }else if(signupToggleBox.classList.contains("show")){
            signupToggleBox.classList.remove("show");
            loginToggleBox.classList.add("show");
        }
    }

    getLoginFormData(){
        const loginForm = document.querySelector('.LoginForm');
        const loginFormData = new FormData(loginForm);
        return {
            email: loginFormData.get("email"), 
            password: loginFormData.get("password"),
        };
    }

    getSignupFormData(){
        const signupForm = document.querySelector('.SignupForm');
        const signupFormData = new FormData(signupForm);
        return {
            name: signupFormData.get("name"), 
            email: signupFormData.get("email"), 
            password: signupFormData.get("password"),
        };
    }
}

const modalController = new ModalController();

document.querySelector('.OpenModal.Item').onclick = modalController.OpenModal;
