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

    async Login({email, password}){
        try{
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, password: password })
            };
            const response = await fetch('/api/user/auth', requestOptions);
            const data = await response.json();
            console.log(data)
        }catch(err){
            console.log(err)
        }
    }

    async getMemberWithCookie(){
        try{
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            const response = await fetch('/api/user/auth', requestOptions);
            const data = await response.json();
            console.log(data)
        }catch(err){
            console.log(err)
        }
    }

}

