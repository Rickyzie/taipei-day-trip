import ModalController from "./modalController.js";
import MemberService from "../service/memberService.js";
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
            this.ChangeOpenModalToBooking();
        }
    }

    logoutMemberData(){
        this.#memberService.Logout()
    };

    ChangeOpenModalToLogout(){
        this.openModal = document.querySelectorAll('.OpenModal.Item');
        const logoutModal = document.querySelector('.LogoutModal.Item');
        this.openModal.forEach((e)=>{
            if(e.classList.contains("show")){
                e.classList.remove("show");
            }
        })
        if(!logoutModal.classList.contains("show")){
            logoutModal.classList.add("show");
        }
    }

    ChangeOpenModalToBooking(){
        const booking = document.querySelector('.Booking.Item');
        if(!booking.classList.contains("show")){
            booking.classList.add("show");
        }
    }

    AddOpenModalHandler(){
        this.openModal = document.querySelectorAll('.OpenModal.Item');
        this.openModalEvent = this.modalController.OpenModal;
        this.openModal.forEach((e)=>{
            e.addEventListener("click", this.openModalEvent);
        })
    }

    AddLogoutModalHandler(){
        this.logoutModal = document.querySelector('.LogoutModal.Item');
        this.logoutModal.addEventListener("click", ()=>{
            this.#memberService.Logout();
        });
    }

}

const navbarController = NavbarController.getInstance();
