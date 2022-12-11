export default class MemberService {
    
    static instance = null;

    nameRegex = /^.{1,10}$/

    emailRegex = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

    passwordRegex = /^(?=.*\d)[A-Za-z\d]{8,15}$/;

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
            if(!this.emailRegex.test(email)) {
                callback("請輸入正確email格式");
                return
            }
            if(!this.passwordRegex.test(password)) {
                callback("密碼請輸入8至15中英混合字元");
                return
            }
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, password: password })
            };
            const response = await fetch('/api/user/auth', requestOptions);
            const result = await response.json();
            if(result.error){
                callback(result.message)
                return
            }
            if(result.ok){
                location.reload();
                return
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
            if(!this.nameRegex.test(name)) {
                callback("姓名請輸入1至10字元");
                return
            }
            if(!this.emailRegex.test(email)) {
                callback("請輸入正確email");
                return
            }
            if(!this.passwordRegex.test(password)) {
                callback("密碼請輸入8至15中英混合字元");
                return
            }
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name, email: email, password: password })
            };
            const response = await fetch('/api/user', requestOptions);
            const result = await response.json();
            if(result.error){
                callback(result.message);
                return
            }
            if(result.ok){
                callback("註冊成功");
                return
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

