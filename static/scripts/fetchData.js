async function getData(page){
    try{
        const response = await fetch(`/api/attractions?page=${page}`);
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





