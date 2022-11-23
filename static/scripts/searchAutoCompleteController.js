import DataService from "./dataService.js";

class SearchAutoCompleteController {
    #dataService
    constructor(){
        this.#dataService = DataService.getInstance();
    }

    render(component){
        this.#dataService.renderWithCategoriesList(component)
    }


    SearchAutoCompleteComponent(list){
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
const searchAutoCompleteController = new SearchAutoCompleteController();
searchAutoCompleteController.render(searchAutoCompleteController.SearchAutoCompleteComponent);