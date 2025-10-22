import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSession } from "../services/authClient";
import { DropdownMenu } from "@radix-ui/themes";
import {TextAlignJustify, X} from "lucide-react"
import { NavLink } from "react-router";
import { motion } from "motion/react";

import { logoutHandler, googleLoginHandler } from "../services/authenticationHandlers.js";

import chromeIcon from "../assets/Chrome.svg"

const NavLanding = () => {
     const [modal, setModal] = useState(false);

  const {data:session} = useSession();

  const navigate = useNavigate()

  useEffect(()=>{
    if(modal){
      document.body.classList.add('overflow-hidden');
    }else{
      document.body.classList.remove('overflow-hidden');
    }

    return ()=>{
      document.body.classList.remove('overflow-hidden');
    }

  }, [modal])

  return (
     <>
    <motion.div initial={{scaleX: 0}} animate={{scaleX:1}} transition={{duration:0.5}} className="bg-marked-navbar px-6 py-3 rounded-xl my-4 flex items-center justify-between w-[95%] z-40 font-inter">
      <NavLink to="/">
          <motion.h1 initial={{ y:10, opacity:0}} animate={{ y:0, opacity:1}} transition={{duration:0.5, delay:0.5}} className="text-marked-dark-green text-3xl font-black uppercase">MARKED</motion.h1>
      </NavLink>
      <div className="flex gap-6 items-center max-md:hidden relative">
        <motion.button initial={{ y:10, opacity:0}} animate={{ y:0, opacity:1}} transition={{duration:0.5, delay:0.5}} className="font-bold uppercase text-marked-dark-green hover:bg-marked-accent bg-none rounded-xl py-3 px-8 cursor-pointer flex items-center gap-2"><img src={chromeIcon} className="w-6 h-6"/>Chrome Extension</motion.button>    
      {session ? 
        <DropdownMenu.Root >
          <DropdownMenu.Trigger>
              {session?.user?.profile ? 
              <motion.img initial={{ y:10, opacity:0}} animate={{ y:0, opacity:1}} transition={{duration:0.5, delay:0.5}} src={ session?.user?.profile} alt="profile" className="profile-home cursor-pointer"/>:
              <motion.div initial={{ y:10, opacity:0}} animate={{ y:0, opacity:1}} transition={{duration:0.5, delay:0.5}} className="profile-home cursor-pointer"></motion.div>  
              }
          </DropdownMenu.Trigger>
          {
            session &&
                <DropdownMenu.Content className='p-4 rounded-md bg-white border border-gray-200 z-90'>
                <DropdownMenu.Item className='outline-0'><p className='text-gray-800 text-xl font-nora-bold'>{session?.user?.name? session?.user?.name : "John Doe"}</p> </DropdownMenu.Item>
                <DropdownMenu.Item className='outline-0'><p className='italic text-gray-500 font-nora-regular py-2 text-lg w-full border-b border-b-gray-400'>{session?.user?.email}</p></DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item className='outline-0'><button className='logout-btn mt-4' onClick={()=>{
                  logoutHandler(navigate)
                  }}>Logout</button></DropdownMenu.Item>
              </DropdownMenu.Content>
              
              
            }
        </DropdownMenu.Root>
        :
        <motion.div initial={{ y:10, opacity:0}} animate={{ y:0, opacity:1}} transition={{duration:0.5, delay:0.5}} className="flex gap-3 items-center">
           <button className="font-bold uppercase bg-marked-regular-green border-2 border-marked-regular-green text-white rounded-xl py-3 px-8 cursor-pointer" 
           onClick={()=>{
            googleLoginHandler()
            }}
           >Sign up</button>
        </motion.div>
      } 
      </div>
      <TextAlignJustify onClick={()=>setModal(true)} className='text-marked-dark-green cursor-pointer hidden max-md:block'/>
    </motion.div>

    {/* Creating a navigation modal in mobile version */}
    {modal ?
      <dialog className={`hidden max-md:flex flex-col justify-start items-center text-2xl font-bold text-nora-indigo gap-4 w-screen h-screen  bg-marked-accent p-8 m-0 z-40 absolute top-0 left-0 -translate-x-8 -translate-y-4`}>
            <X  onClick={()=>setModal(false)}/>
              {session ? 
              <>
                <span className="py-2 flex items-center gap-4 w-full">
                  { session?.user?.profile ? 
                  <img src={ session?.user?.profile} alt="profile" className="profile-home !w-8 !h-8"/>:
                  <div className="profile-home !w-8 !h-8"></div>}
                  <p className='text-gray-800 font-marked-semibold'>{ session?.user?.name ? session?.user?.name : "John Doe"}</p> 
                </span>
                <p className='italic text-gray-800 font-nora-regular py-2 text-xl w-full'>{session?.user?.email}</p>
                <div className='logout-btn' onClick={()=>{
                    logoutHandler(navigate)
                    }}>Logout</div>
              </>
              
              : 
              <>
                <button className="border-b-2 border-marked-text-light-green py-2 cursor-pointer"
                 onClick={()=>{
                  googleLoginHandler()
                }}
                >Sign up</button>
                <button className="border-b-2 border-marked-text-light-green py-2 flex items-center gap-2 cursor-pointer"><img src={chromeIcon} className="w-6 h-6"/>Add Chrome Extension</button>  
              </>  
              }
      </dialog>
    :null}
    
    </>
  )
}

export default NavLanding