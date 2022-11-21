//SearchAutoComplete 控制組件
const SearchAutoComplete = document.querySelector('.SearchAutoComplete')
function changeMode() {
    SearchAutoComplete.classList.toggle("show")
    } 
document.addEventListener("click", e => {
    const CarouselSearch = document.querySelector(".CarouselSearch");
    const CarouselInput = document.querySelector(".CarouselInput");

    if (CarouselSearch == e.target || CarouselInput.contains(e.target)) {
        changeMode();
    }else if (SearchAutoComplete.classList.contains("show")){
        changeMode();
    }else{
        return;
    }
});

const CarouselButton = document.querySelector('.CarouselButton')

CarouselButton.addEventListener('click', (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector('.CarouselSearch'));
    let element = document.querySelector('.Content');
    while (element.firstChild) {
    element.removeChild(element.firstChild);
    }
    getData(0, formData.get("keyword"))
});