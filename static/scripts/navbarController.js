import ModalController from "./modalController.js";
import MemberService from "./memberService.js";
class NavbarController {

    modalController = null;

    #memberService = null;

    constructor(){
        this.modalController = ModalController.getInstance();
        this.#memberService = MemberService.getInstance();
        this.initMemberData();
        this.OpenModalHandler();
    }

    initMemberData(){
        this.#memberService.getMemberWithCookie();
    }

    OpenModalHandler(){
        document.querySelector('.OpenModal.Item').onclick = this.modalController.OpenModal;
    }

}

const navbarController = new NavbarController();