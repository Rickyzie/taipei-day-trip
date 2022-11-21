async function getData(page, keyword = ""){
    try{
        const response = await fetch(`/api/attractions?page=${page}&keyword=${keyword}`);
        const results = await response.json();
        results.data.map((val)=>{
            CardComponent(val);
        }).join(" ");
        canScroll = true;
        nextPage = results.nextPage
    }catch(err){
        console.log(err)
    }
}

async function getCategories(){
    try{
        const response = await fetch(`/api/categories`);
        const results = await response.json();
        SearchAutoCompleteComponent(results.data)
    }catch(err){
        console.log(err)
    }
}
getCategories()




