import DataService from "./dataService.js";
import ContentController from "./contentController.js"
class CarouselSearchController {

    #dataService

    constructor(){
        this.#dataService = DataService.getInstance();
        this.contentController = ContentController.getInstance();
        this.render(this.CarouselSearchComponent);
        this.CarouselButtonHandler();
        this.SearchAutoCompleteToggleHandler();
    }

    render(component){
        this.#dataService.renderWithCategoriesList(component)
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
            this.SearchAutoComplete.classList.remove("show");
            
        });
    }

    CarouselSearchComponent(list){
        list.map((val)=>{
            const divSelected = document.createElement("div");
            divSelected.textContent = val;
            divSelected.setAttribute("class", "SearchAutoCompleteItem");
            document.querySelector(".SearchAutoComplete").appendChild(divSelected.cloneNode(true));
        })
        const SearchAutoCompleteItem = document.querySelectorAll('.SearchAutoCompleteItem');
        for(var i=0; i<SearchAutoCompleteItem.length; i++){
            SearchAutoCompleteItem[i].addEventListener("click", (e)=>{
                document.querySelector('.CarouselInput').value = e.target.innerHTML});
        }
    }
}

const c = new CarouselSearchController();
