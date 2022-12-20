import ReservationsService from "../service/reservationsService.js";
import MemberService from "../service/memberService.js";

export default class ReservationsController {

    reservationService = null;

    reservationsList = [];


    constructor(){
        this.reservationService = ReservationsService.getInstance();
        this.memberService = MemberService.getInstance();
        this.render(this.ReservationComponent, (data)=>{
            this.reservationList = data;
            this.ChangeTotalPrice();
            this.IconDeleteHandler();
        })
        this.UserTextHandler();
    }

    render(component, callback){
        this.reservationService.renderWithReservtionsByCookie(component, callback);
    }

    ReservationComponent(list){
        if(list.length<=0){
            document.querySelector(".ReservationNone").classList.add("show");
            return;
        }
        document.querySelector(".ConfirmForm").classList.add("show");

        const arguement = {
            morning:"上半天",
            afternoon:"下半天"
        };
        list.map(({attraction , date, time, reservationId, price}) => {
            const Reservation = document.createElement("div");
            Reservation.setAttribute("class", "Reservation");

            const ImgWrapper = document.createElement("div");
            ImgWrapper.setAttribute("class", "ImgWrapper");
            const Img = document.createElement("img");
            Img.src = attraction.image;
            ImgWrapper.appendChild(Img);

            const DivWrapReservation = document.createElement("div").cloneNode(true);

            const ReservationTitle = document.createElement("div");
            ReservationTitle.setAttribute("class", "ReservationTitle");
            ReservationTitle.textContent = "台北一日遊：" + attraction.name;

            const ReservationDetail = document.createElement("div");
            ReservationDetail.setAttribute("class", "ReservationDetail");

            const DateP = document.createElement("p");
            DateP.textContent = "日期：";

            const TimeP = document.createElement("p");
            TimeP.textContent = "時間：";

            const AddressP = document.createElement("p");
            AddressP.textContent = "費用：";

            const PriceP = document.createElement("p");
            PriceP.textContent = "地點：";

            const Date = document.createElement("span");
            Date.setAttribute("class", "Date");
            Date.textContent = date;

            const Time = document.createElement("span");
            Time.setAttribute("class", "Time");
            Time.textContent = arguement[time];

            const Address = document.createElement("span");
            Address.setAttribute("class", "Address");
            Address.textContent = attraction.address;

            const Price = document.createElement("span");
            Price.setAttribute("class", "Price");
            Price.textContent = price;

            let Item 

            Item = document.createElement("div");
            Item.appendChild(DateP).appendChild(Date);
            ReservationDetail.appendChild(Item);

            Item = document.createElement("div");
            Item.appendChild(TimeP).appendChild(Time);
            ReservationDetail.appendChild(Item);

            Item = document.createElement("div");
            Item.appendChild(AddressP).appendChild(Address);
            ReservationDetail.appendChild(Item);

            Item = document.createElement("div");
            Item.appendChild(PriceP).appendChild(Price);
            ReservationDetail.appendChild(Item);

            DivWrapReservation.appendChild(ReservationTitle);

            DivWrapReservation.appendChild(ReservationDetail);

            Reservation.appendChild(ImgWrapper);
            const IconDelete = document.createElement("div");
            IconDelete.setAttribute("class", "IconDelete");
            IconDelete.style.backgroundImage = `url(../images/icon_delete.png)`;
        

            Reservation.appendChild(DivWrapReservation);
            Reservation.appendChild(IconDelete)
            document.querySelector(".Reservations").appendChild(Reservation);
        })
    }

    ChangeTotalPrice(){
        let total = 0;
        this.reservationList.forEach((val)=>{
            total+= val.price?val.price:0;
        })
        document.querySelector(".TotalPrice").textContent = "總價：新台幣 " + total.toString() + "元";
    }

    UserTextHandler(){
        this.memberService.getMemberWithCookie((result)=>{
            if(result.data){
                document.querySelector(".UserText").textContent = "您好，" + result.data.name + "，待預訂的行程如下："
            }
        })
    }

    IconDeleteHandler(){
        const IconDelete = document.querySelectorAll(".IconDelete")
        IconDelete.forEach((element,index)=>{
            element.addEventListener("click", (e)=>{
                this.deleteReservation(this.reservationList[index].reservationId, (result)=>{
                    alert("刪除成功")
                    const reservation = e.path[1];
                    reservation.remove();
                    this.reservationList[index] = {};
                    this.ChangeTotalPrice();
                    this.CheckRervations();
                    
                });
            })
        })
    }

    CheckRervations(){
        if(document.querySelector(".Reservations").children.length<=1){
            document.querySelector(".ReservationNone").classList.add("show");
            document.querySelector(".ConfirmForm").classList.remove("show");
        }
    }

    deleteReservation(id, callback){
        this.reservationService.deleteReservtionById(id, callback);
    }
}

const reservationsController = new ReservationsController();