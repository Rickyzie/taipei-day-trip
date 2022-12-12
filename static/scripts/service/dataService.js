export default class DataService {
    
    static instance = null;

    constructor() {
        this.nextPage = 0;
        this.keyword = "";
        this.canScroll = true;
    }

    static getInstance() {
        if (DataService.instance === null) {
        DataService.instance = new DataService();
        }
        return DataService.instance;
    }

    getNextPage(){
        return this.nextPage;
    }
    getKeyword(){
        return this.keyword;
    }

    async renderWithAttractionsList(component, page, keyword){
        try{
            if(!this.canScroll) return;
            this.canScroll = false;
            const response = await fetch(`/api/attractions?page=${page}&keyword=${keyword}`);
            const result = await response.json();
            if(result.error){
                console.log(result)
                return
            }
            component(result.data)
            this.canScroll = true;
            this.nextPage = result.nextPage;
            this.keyword = keyword;
        }catch(err){
            console.log(err)
        }
    }

    async renderWithAttractionId(component, id, callback){
        try{
            const response = await fetch(`/api/attraction/${id}`);
            const result = await response.json();
            if(result.error){
                console.log(result)
                return
            }
            component(result.data)
            if(callback) callback();
        }catch(err){
            console.log(err)
        }
    }

    async  renderWithCategoriesList(component, callback){
        try{
            const response = await fetch(`/api/categories`);
            const result = await response.json();
            if(result.error){
                console.log(result)
                return
            }
            component(result.data)
            if(callback) callback();
        }catch(err){
            console.log(err)
        }
    }

}

