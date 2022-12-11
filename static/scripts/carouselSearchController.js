import DataService from "./dataService.js";
import ContentController from "./contentController.js"
class CarouselSearchController {

    #dataService

    constructor(){
        this.#dataService = DataService.getInstance();
        this.contentController = ContentController.getInstance();
        this.render(this.SearchAutoCompleteComponent, ()=>{
            console.log(1)
            this.SearchAutoCompleteItemHandler();
        });
        this.CarouselButtonHandler();
        this.SearchAutoCompleteToggleHandler();
    }

    render(component, callback){
        this.#dataService.renderWithCategoriesList(component, callback)
    }

    CarouselButtonHandler(){
        document.querySelector('.CarouselButton').addEventListener('click', (e) => {
            e.preventDefault();
            const formData = new FormData(document.querySelector('.CarouselSearch'));
            this.contentController.cleanAllContentElement();
            this.contentController.render(this.contentController.ContentComponent, 0, formData.get("keyword"))
        });
    }

    SearchAutoCompleteToggleHandler(){
        this.SearchAutoComplete = document.querySelector('.SearchAutoComplete')
        this.CarouselInput = document.querySelector(".CarouselInput");
        this.CarouselInput.addEventListener("focus", e => {
            this.SearchAutoComplete.classList.add("show");
        });
        this.CarouselInput.addEventListener("blur", e => {
            setTimeout(()=> this.SearchAutoComplete.classList.remove("show"), 200 )            
        });
    }

    SearchAutoCompleteItemHandler(){
        const SearchAutoCompleteItem = document.querySelectorAll('.SearchAutoCompleteItem');
        SearchAutoCompleteItem.forEach((element)=>{
            element.addEventListener("click", (e)=>{
                document.querySelector('.CarouselInput').value = e.target.textContent;
            })
        })
    }

    SearchAutoCompleteComponent(list){
        list.map((val)=>{
            const divSelected = document.createElement("div");
            divSelected.textContent = val;
            divSelected.setAttribute("class", "SearchAutoCompleteItem");
            document.querySelector(".SearchAutoComplete").appendChild(divSelected.cloneNode(true));
        })  
    }
}

const c = new CarouselSearchController();
