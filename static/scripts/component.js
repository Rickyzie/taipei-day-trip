function TopComponent(src, title){
    const divCard = document.createElement("div");
    divCard.setAttribute("class", "Top");
    const divImgWrapper = document.createElement("div");
    divImgWrapper.setAttribute("class", "ImgWrapper");
    divImgWrapper.style.backgroundImage = src;
    const divContext = document.createElement("div");
    divContext.setAttribute("class", "Context");
    const img = new Image();
    img.src = src;
    divCard.appendChild(divImgWrapper);
    divCard.appendChild(divContext).textContent = title;
    divImgWrapper.appendChild(img);
    document.querySelector(".Content").appendChild(divCard);
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
