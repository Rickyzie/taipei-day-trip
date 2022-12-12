import DataService from "../service/dataService.js";

class AttractionReserveController {

    #dataService;

    constructor(){
        this.#dataService = DataService.getInstance();
        this.render(this.AttractionReserveComponent, this.getUrlId(), ()=>{
            this.ReserveTimeHandler();
        });
    }

    getUrlId(){
        const id = window.location.href.split("/").pop();
        return !isNaN(id)?id:null;
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
        let arguement = {
            morning:"新台幣2000元",
            afternoon:"新台幣2500元"
        };
        document.querySelector(".Cost").textContent = arguement.morning;
        const ReserveTime = document.querySelectorAll("input[name='reserveTime']");
        ReserveTime.forEach((element)=>{
            element.addEventListener('change', () => {
                document.querySelector(".Cost").textContent = arguement[element.value];
            });
        })
    }

}

const attractionReserveController = new AttractionReserveController();
