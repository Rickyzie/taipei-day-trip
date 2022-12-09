import ModalController from "./modalController.js";
import MemberService from "./memberService.js";
export default class NavbarController {

    modalController = null;

    #memberService = null;

    openModal = null;

    OpenModalEvent = null;

    static instance = null;

    static getInstance() {
        if (NavbarController.instance === null) {
            NavbarController.instance = new NavbarController();
        }
        return NavbarController.instance;
    }

    constructor(){
        this.modalController = ModalController.getInstance();
        this.#memberService = MemberService.getInstance();
        this.#memberService.getMemberWithCookie((result)=>{this.InitOpenModal(result)})
        this.AddOpenModalHandler();
        this.AddLogoutModalHandler();
    }

    InitOpenModal(result){
        if(result.data){
            this.ChangeOpenModalToLogout();
        }
    }

    logoutMemberData(){
        this.#memberService.Logout()
    };

    loginAndlogoutToggle(){
        this.openModal = document.querySelector('.OpenModal.Item');
        this.openModalEvent = this.modalController.OpenModal;
        this.openModal.removeEventListener("click", this.openModalEvent);
        this.openModal.textContent = "登出";
        this.logoutEvent = this.logoutMemberData();
        this.openModal.addEventListener("click", this.logoutEvent);
    }

    ChangeOpenModalToLogout(){
        const openModal = document.querySelector('.OpenModal.Item');
        const logoutModal = document.querySelector('.LogoutModal.Item');

        if(openModal.classList.contains("show")){
            openModal.classList.remove("show");
        }
        if(!logoutModal.classList.contains("show")){
            logoutModal.classList.add("show");
        }
    }

    ChangeLogoutModalToOpen(){
        const openModal = document.querySelector('.OpenModal.Item');
        const logoutModal = document.querySelector('.LogoutModal.Item');

        if(logoutModal.classList.contains("show")){
            logoutModal.classList.remove("show");
        }
        if(!openModal.classList.contains("show")){
            openModal.classList.add("show");
        }
    }

    AddOpenModalHandler(){
        this.openModal = document.querySelector('.OpenModal.Item');
        this.openModalEvent = this.modalController.OpenModal;
        this.openModal.addEventListener("click", this.openModalEvent);
    }

    AddLogoutModalHandler(){
        this.logoutModal = document.querySelector('.LogoutModal.Item');
        this.logoutModal.addEventListener("click", ()=>{
            this.#memberService.Logout();
        });
    }

}

const navbarController = NavbarController.getInstance();