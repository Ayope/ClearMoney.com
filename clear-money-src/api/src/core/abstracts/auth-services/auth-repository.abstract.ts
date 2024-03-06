export abstract class IAuthRepository {
    
    abstract login(email: string, password:string) : Promise<any>;  
  
    abstract signup(email: string, password:string) : Promise<any>;    
    
}
  