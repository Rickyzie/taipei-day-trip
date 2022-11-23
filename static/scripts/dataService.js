export default class DataService {
    
    static instance = null;
    
    constructor() {}

    static getInstance() {
        if (DataService.instance === null) {
        DataService.instance = new DataService();
        }
        return DataService.instance;
    }

    async renderWithAttractionsList(component, page, keyword = ""){
        try{
            const response = await fetch(`/api/attractions?page=${page}&keyword=${keyword}`);
            const { data } = await response.json();
            component(data)
            canScroll = true;
            nextPage = results.nextPage
        }catch(err){
            console.log(err)
        }
    }

    async  renderWithCategoriesList(component){
        try{
            const response = await fetch(`/api/categories`);
            const { data } = await response.json();
            component(data)
        }catch(err){
            console.log(err)
        }
    }

}

