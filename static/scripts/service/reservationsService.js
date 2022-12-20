export default class ReservationsService {
    
    static instance = null;

    constructor() {
    }

    static getInstance() {
        if (ReservationsService.instance === null) {
            ReservationsService.instance = new ReservationsService();
        }
        return ReservationsService.instance;
    }

    async renderWithReservtionsByCookie(component,callback){
        try{
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            const response = await fetch('/api/booking', requestOptions);
            const result = await response.json();
            if(result.error){
                console.log(result)
                return
            }
            component(result.data)
            callback(result.data)
        }catch(err){
            console.log(err)
        }
    }

    async deleteReservtionById(id, callback){
        try{
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    id: id,
                    })
            };
            const response = await fetch('/api/booking', requestOptions);
            const result = await response.json();
            if(result.error){
                alert(error.message)
                return
            }
            if(callback && result.ok) callback(result);
        }catch(err){
            console.log(err)
        }
    }

}