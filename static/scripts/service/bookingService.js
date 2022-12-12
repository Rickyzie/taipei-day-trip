export default class BookingService {
    
    static instance = null;

    constructor() {
    }

    static getInstance() {
        if (BookingService.instance === null) {
            BookingService.instance = new BookingService();
        }
        return BookingService.instance;
    }

    async reserve({attractionId, date, time, price}, callback){
        try{
            console.log(attractionId, date, time, price)
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    attractionId: attractionId,
                    date: date, 
                    time: time,
                    price:price,
                    })
            };
            const response = await fetch('/api/booking', requestOptions);
            const result = await response.json();
            if(result.error){
                console.log(result);
                return
            }
            if(result.ok){
                console.log(result);
                return
            }
        }catch(err){
            console.log(err)
        }
    }
}

