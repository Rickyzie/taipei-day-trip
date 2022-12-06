class ModalController {
    constructor(){

    }

    CloseButtonHandler(){
        const closeButton = document.querySelector('.CloseButton');
        closeButton.addEventListener("click", ()=>{
            closeButton.classList.toggle("show");
        });

    }


}