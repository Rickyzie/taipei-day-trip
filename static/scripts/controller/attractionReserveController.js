import DataService from "../service/dataService.js";
import BookingService from "../service/bookingService.js";
import ModalController from "./modalController.js";
class AttractionReserveController {

    #dataService;

    #bookingService;
    modalController;

    arguement = {
        morning:2000,
        afternoon:2500
    };

    constructor(){
        this.#dataService = DataService.getInstance();
        this.#bookingService = BookingService.getInstance();
        this.modalController = ModalController.getInstance();

        this.render(this.AttractionReserveComponent, this.getUrlId(), ()=>{
            this.ReserveTimeHandler();
            this.ReserveFormHandler();
        });
    }

    reserve(){
        const reserveFormData = this.getReserveFormData();
        if(!!reserveFormData) this.#bookingService.reserve(reserveFormData, (result)=>{
            if(result.error && result.message === "NEED_LOGIN"){
                this.modalController.OpenModal();
                return
            }
            if(result.ok){
                alert("預約成功");
                return
            }
        });
    }

    ReserveFormHandler(){
        const reserveButton = document.querySelector('.ReserveButton');
        reserveButton.addEventListener("click", ()=>{
            this.reserve();
        })
    }

    render(component,id, callback){
        this.#dataService.renderWithAttractionId(component, id, callback);
    }

    AttractionReserveComponent({name, category, mrt, description, address, transport}){
        document.querySelector('.Name').textContent = name;
        document.querySelector('.CategoryAtMrt').textContent = category + " at " + mrt;
        document.querySelector('.ReserveDescription').textContent = description;
        document.querySelector('.ReserveAddress').textContent = address;
        document.querySelector('.ReserveTransport').textContent = transport;

    }

    ReserveTimeHandler(){
        document.querySelector(".Cost").textContent = "新台幣" + this.arguement.morning + "元";
        const ReserveTime = document.querySelectorAll("input[name='reserveTime']");
        ReserveTime.forEach((element)=>{
            element.addEventListener('change', () => {
                document.querySelector(".Cost").textContent = "新台幣"+ this.arguement[element.value] + "元";
            });
        })
    }

    getUrlId(){
        const id = window.location.href.split("/").pop();
        return !isNaN(id)?id:null;
    }

    getReserveFormData(){
        const reserveForm = document.querySelector('.ReserveForm');
        const reserveFormData = new FormData(reserveForm);

        if(!reserveFormData.get("reserveDate")) return null;

        return {
            attractionId: this.getUrlId(),
            date: reserveFormData.get("reserveDate"), 
            time: reserveFormData.get("reserveTime"),
            price: this.arguement[reserveFormData.get("reserveTime")],
        };
    }

}

const attractionReserveController = new AttractionReserveController();
