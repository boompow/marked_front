import { Slide, toast } from "react-toastify";

function notification(message, success){
     const options = {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
    }

    if(success){
        toast.success(message, options)
    }

    if(!success){
        toast.error(message, options)
    }
}

export default notification;
