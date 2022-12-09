export default class MemberService {
    
    static instance = null;

    constructor() {
    }

    static getInstance() {
        if (MemberService.instance === null) {
            MemberService.instance = new MemberService();
        }
        return MemberService.instance;
    }

    async Login({email, password}, callback){
        try{
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, password: password })
            };
            const response = await fetch('/api/user/auth', requestOptions);
            const result = await response.json();
            if(result.error){
                callback(result.message)
            }
            if(result.ok){
                location.reload();
            }
        }catch(err){
            console.log(err)
        }
    }

    async Logout(){
        try{
            const requestOptions = {
                method: 'DELETE',
            };
            const response = await fetch('/api/user/auth', requestOptions);
            const result = await response.json();
            if(result.error){
                console.log(result)
            }
            if(result.ok){
                location.reload();
            }
        }catch(err){
            console.log(err)
        }
    }

    async Signup({name, email, password}, callback){
        try{
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name, email: email, password: password })
            };
            const response = await fetch('/api/user', requestOptions);
            const result = await response.json();
            if(result.error){
                callback(result.message);
            }
            if(result.ok){
                callback("signup successful");
            }
        }catch(err){
            console.log(err)
        }
    }

    async getMemberWithCookie(callback){
        try{
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            const response = await fetch('/api/user/auth', requestOptions);
            const result = await response.json();
            callback(result)
        }catch(err){
            console.log(err)
        }
    }

}

