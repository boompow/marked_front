
import { useEffect, useRef } from "react";
import { X } from "lucide-react";

const ModalContainer = ({children, modal, onClose}) => {

    const modalRef = useRef(null);
      
   // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose?.();
      }
    };

    if (modal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modal, onClose]);

  // Close on Esc + disable scroll
  useEffect(() => {
    if (modal) {
      document.body.classList.add("overflow-hidden");

      const handleEsc = (e) => {
        if (e.key === "Escape") onClose?.();
      };
      document.addEventListener("keydown", handleEsc);

      return () => {
        document.body.classList.remove("overflow-hidden");
        document.removeEventListener("keydown", handleEsc);
      };
    }
  }, [modal, onClose]);

    if (!modal) return null;

    return(  
        <div className="flex z-50 fixed inset-0 bg-slate-950/40 items-center justify-center" role="dialog" aria-modal="true">
            <div ref={modalRef} className="relative z-10 bg-marked-gray border border-white/40 overflow-hidden max-w-[650px] w-[100%] shadow-xl">
                <div className="w-full flex justify-end items-center pt-4 pr-4">
                    <X className="text-marked-dark-green active:text-marked-moderate-green cursor-pointer" onClick={()=>{onClose?.()}}/>
                </div>
                {children}
            </div>
        </div>
    )
}

export default ModalContainer;