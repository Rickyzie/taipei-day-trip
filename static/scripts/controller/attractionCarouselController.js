import DataService from "../service/dataService.js";

class AttractionCarouselController {

    #dataService;

    currentPage = 0;

    constructor(){
        this.#dataService = DataService.getInstance();
        this.render(this.AttractionCarouselComponent, this.getUrlId());
        this.DotsHandler();
    }

    getUrlId(){
        const id = window.location.href.split("/").pop();
        return !isNaN(id)?id:null;
    }

    render(component){
        this.#dataService.renderWithAttractionId(component, this.getUrlId(),()=>{
            this.ArrowHandler();
            this.DotsHandler();
        });
    }

    AttractionCarouselComponent(data){
        data.images.map((val)=>{
            const img = document.createElement("img");
            img.src = val;
            const divImgWrapper = document.createElement("div");
            divImgWrapper.setAttribute("class", "ImgWrapper");
            divImgWrapper.appendChild(img)
            document.querySelector(".AttractionCarousel").appendChild(divImgWrapper);
            const dot = document.createElement("div"); 
            dot.setAttribute("class", "Dot")
            document.querySelector(".NavigationDots").appendChild(dot);
        })
        document.querySelector(".NavigationDots").children[0].classList.toggle("active");
    }

    ArrowHandler(){
        const leftArrow = document.querySelector(".LeftArrow");
        const rightArrow = document.querySelector(".RightArrow");
        leftArrow.addEventListener("click", ()=>{
            this.IsScrollToPage(this.currentPage -1)?this.currentPage--:this.currentPage;
        })
        rightArrow.addEventListener("click", ()=>{
            this.IsScrollToPage(this.currentPage + 1)?this.currentPage++:this.currentPage;
        })
    }

    DotsHandler(){
        for(let i = 0; i<document.querySelector(".NavigationDots").childElementCount; i++){
            document.querySelector(".NavigationDots").children[i].addEventListener("click", ()=>{
                this.ActiveDots(i);
                this.currentPage = i;
                this.IsScrollToPage(i);
            });
        }
    }

    IsScrollToPage(page){
        const attractionCarousel = document.querySelector(".AttractionCarousel")
        if(page < 0 || page + 1 > attractionCarousel.childElementCount){
            return false;
        }else{
            const pageWidth = attractionCarousel.scrollWidth/attractionCarousel.childElementCount;
            this.ActiveDots(page);
            attractionCarousel.scrollTo(pageWidth*page, 0);
            return true
        }      
    }

    ActiveDots(page){
        for(let i = 0; i<document.querySelector(".NavigationDots").childElementCount; i++){
            if (page === i){
                document.querySelector(".NavigationDots").children[i].classList.add("active");
            }else{
                document.querySelector(".NavigationDots").children[i].classList.remove("active");
            }
        }
    }
}

const a = new AttractionCarouselController();