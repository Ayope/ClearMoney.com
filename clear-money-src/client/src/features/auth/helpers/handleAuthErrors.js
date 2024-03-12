import { toast } from "react-toastify";

export default function handleAuthErrors(error){
    
    if(error.response){
        
        console.error(error.response);

        toast.error(error.response?.data?.message);

        if(error.response?.data?.data === "Validation failed"){
    
            error.response?.data?.message?.forEach((error) => {
                toast.error(error);
            });
            
            return;
        }
        
    }else{
        console.error(error);
    }

    

}