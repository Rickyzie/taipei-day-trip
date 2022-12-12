import MemberService from "../service/memberService.js";
export default class ModalController {

    static instance = null;

    #memberService = null;

  
    
    constructor(){
        this.#memberService = MemberService.getInstance();

        this.LoginFormHandler();
        this.SignupFormHandler();
        this.ChangeModalToSignupHandler();
        this.ChangeModalToLoginHandler();
        this.CloseButtonHandler();
    }

    static getInstance() {
        if (ModalController.instance === null) {
            ModalController.instance = new ModalController();
        }
        return ModalController.instance;
    }

    Login(){
        document.querySelector(".LoginMessage").textContent ="";
        const loginFormData = this.getLoginFormData();
        this.#memberService.Login(loginFormData, (result)=>{
            document.querySelector(".LoginMessage").textContent = result;
        });
    }

    Signup(){
        document.querySelector(".SignupMessage").textContent ="";
        const signupFormData = this.getSignupFormData();
        this.#memberService.Signup(signupFormData, (result)=>{
            document.querySelector(".SignupMessage").textContent = result;
        });
    }

    LoginFormHandler(){
        const loginFormButton = document.querySelector('.LoginFormButton');
        loginFormButton.addEventListener("click", ()=>{
            this.Login();
        })
    }

    SignupFormHandler(){
        const signupFormButton = document.querySelector('.SignupFormButton');
        signupFormButton.addEventListener("click", ()=>{
            this.Signup();
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

const modalController = ModalController.getInstance();


