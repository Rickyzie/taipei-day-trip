import DataService from "../service/dataService.js";
import Trigger from "../global/trigger.js";
export default class ContentController {

    #dataService = null;

    static instance = null;

    static getInstance() {
        if (ContentController.instance === null) {
            ContentController.instance = new ContentController();
        }
        return ContentController.instance;
    }

    constructor(){
        this.#dataService = DataService.getInstance();
        this.render(this.ContentComponent, 0, "");
        this.trigger = new Trigger(".ScrollLoader", ()=>{
            this.render(this.ContentComponent, this.#dataService.getNextPage(), this.#dataService.getKeyword());
        });
    }

    render(component, page, keyword){
        if(page !== null) this.#dataService.renderWithAttractionsList(component, page, keyword);
    }

    cleanAllContentElement(){
        let e = document.querySelector('.Content');
        while (e.firstChild) {
            e.removeChild(e.firstChild);
        };
    }

    ContentComponent(list){
        list.map(({category, name, mrt, images, id}) => {
            const url = document.createElement("a");
            url.href = `./attraction/${id}`;
            const divCard = document.createElement("div");
            divCard.setAttribute("class", "Card");
        
            const divImgWrapper = document.createElement("div");
            divImgWrapper.setAttribute("class", "ImgWrapper"); 
            divImgWrapper.style.backgroundImage = `url(${images[0]})`;
        
            const divTitle = document.createElement("div");
            divTitle.setAttribute("class", "Title");
        
            const divCategory = document.createElement("div");
            divCategory.setAttribute("class", "Category");
        
            const divMrt = document.createElement("div");
            divMrt.setAttribute("class", "Mrt");
        
            const divDetail = document.createElement("div");
            divDetail.setAttribute("class", "Detail");
            
            divCard.appendChild(divImgWrapper);
            divCard.appendChild(divTitle).textContent = name;
            divDetail.appendChild(divMrt).textContent = mrt;
            divDetail.appendChild(divCategory).textContent = category;
            divCard.appendChild(divDetail);
            url.appendChild(divCard);
            console.dir(url)
            document.querySelector(".Content").appendChild(url);
        })
    }
}
const c = ContentController.getInstance();