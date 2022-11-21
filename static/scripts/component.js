function SearchAutoCompleteComponent(list){
    list.map((val)=>{
        const divSelected = document.createElement("div");
        divSelected.textContent = val;
        divSelected.setAttribute("class", "SearchAutoCompleteItem");
        divSelected.cloneNode(true);
        document.querySelector(".SearchAutoComplete").appendChild(divSelected.cloneNode(true));
    })
    const SearchAutoCompleteItem = document.querySelectorAll('.SearchAutoCompleteItem')
    for(var i=0; i<SearchAutoCompleteItem.length; i++){
        SearchAutoCompleteItem[i].addEventListener("click", (e)=>{document.querySelector('.CarouselInput').value = e.target.innerHTML}) ;
    }
}
function CardComponent({category, name, mrt, images}){

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
    divCard.appendChild(divDetail)
    document.querySelector(".Content").appendChild(divCard);
}
