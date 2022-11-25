export default class Trigger {
    option = {
        root: null,
        rootMargin: "20px",
        threshold: 0
    };
    constructor(scrollLoader, callback){
        this.scrollLoader = document.querySelector(scrollLoader);
        this.callback = callback;
        this.observer = new IntersectionObserver((entries)=>{
            if (entries[0].isIntersecting) this.callback();
        }, this.option);
        if(this.scrollLoader) this.observer.observe(this.scrollLoader);
    }
}




