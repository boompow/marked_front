import { useEffect} from "react"
import { useSession } from "../services/authClient";

const LoadingState = ({children}) => {
    const {isPending} = useSession();

    useEffect(()=>{
        if(isPending){
          document.body.classList.add('overflow-hidden');
        }else{
          document.body.classList.remove('overflow-hidden');
        }
    
        return ()=>{
          document.body.classList.remove('overflow-hidden');
        }
    
      }, [isPending])


    if(isPending){
        return(
            <div className="h-screen w-screen bg-black flex items-center justify-center absolute top-0 left-0 z-90">
                <div>
                    <div className="h-3 w-12 bg-marked-moderate-green loading-animation [animation-delay:0.3s]"></div>
                    <div className="h-3 w-12 bg-marked-moderate-green loading-animation [animation-delay:0s]"></div>
                    <div className="h-3 w-12 bg-marked-moderate-green loading-animation [animation-delay:0.3s]"></div>
                </div>
            </div>
        )
    }
  return children;
}

export default LoadingState