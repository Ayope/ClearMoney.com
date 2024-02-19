export abstract class IAuthRepository {
    
    // can change any (return value) by a object like this {email , password , AccessToken, RefreshToken ...}

    abstract login(email: string, password:string) : any;  
  
    abstract signup(email: string, password:string) : any;    

}
  