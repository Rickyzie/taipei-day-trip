import DataService from "../service/dataService.js";
import BookingService from "../service/bookingService.js";
class AttractionReserveController {

    #dataService;

    #bookingService;

    arguement = {
        morning:"新台幣2000元",
        afternoon:"新台幣2500元"
    };

    constructor(){
        this.#dataService = DataService.getInstance();
        this.#bookingService = BookingService.getInstance();

        this.render(this.AttractionReserveComponent, this.getUrlId(), ()=>{
            this.ReserveTimeHandler();
            this.ReserveFormHandler();
        });
    }

    reserve(){
        const reserveFormData = this.getReserveFormData();
        if(!!reserveFormData) this.#bookingService.reserve(reserveFormData);
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
        document.querySelector(".Cost").textContent = this.arguement.morning;
        const ReserveTime = document.querySelectorAll("input[name='reserveTime']");
        ReserveTime.forEach((element)=>{
            element.addEventListener('change', () => {
                document.querySelector(".Cost").textContent = this.arguement[element.value];
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
