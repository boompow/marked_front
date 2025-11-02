import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSession } from "../services/authClient";
import { DropdownMenu } from "@radix-ui/themes";
import {TextAlignJustify, X, Github} from "lucide-react"
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
         <motion.a href="https://github.com/boompow/marked_front" target="_blank" initial={{ y:10, opacity:0}} animate={{ y:0, opacity:1}} transition={{duration:0.5, delay:0.5}} className="py-3 px-8 rounded-xl flex items-center justify-center gap-2 bg-marked-accent/70 hover:bg-marked-accent border-2 border-marked-dark-green text-marked-dark-green cursor-pointer uppercase font-semibold"><Github/>Star it</motion.a>
        {/* <motion.button initial={{ y:10, opacity:0}} animate={{ y:0, opacity:1}} transition={{duration:0.5, delay:0.5}} className="font-bold uppercase text-marked-dark-green hover:bg-marked-accent bg-none rounded-xl py-3 px-8 cursor-pointer flex items-center gap-2"><img src={chromeIcon} className="w-6 h-6"/>Chrome Extension</motion.button>     */}
      {session ? 
        <DropdownMenu.Root >
          <DropdownMenu.Trigger>
              {session?.user?.image ? 
              <motion.img initial={{ y:10, opacity:0}} animate={{ y:0, opacity:1}} transition={{duration:0.5, delay:0.5}} src={ session?.user?.image} alt="profile" className="profile-home cursor-pointer"/>:
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
      <dialog className={`hidden max-md:flex flex-col text-2xl font-inter text-white wrap-anywhere gap-4 w-screen h-screen bg-black p-8 z-40 absolute top-0 left-0`}>
            <span className="w-full flex justify-end items-center mb-8" >
              <X onClick={()=>setModal(false)}/>
            </span>
              {session ? 
              <>
                <span className="flex items-center gap-4 w-full">
                  { session?.user?.image ? 
                  <img src={ session?.user?.image} alt="profile" className="profile-home !w-8 !h-8"/>:
                  <div className="profile-home !w-8 !h-8"></div>}
                  <p className='text-white font-marked-semibold'>{ session?.user?.name ? session?.user?.name : "John Doe"}</p> 
                </span>
                <p className='italic text-marked-moderate-green/80 text-xl w-full'>{session?.user?.email}</p>
                <hr className="my-3"/>
                <div className='logout-btn !text-lg' onClick={()=>{
                    setModal(false)
                    logoutHandler(navigate)
                    }}>Logout</div>
              </>
              
              : 
              <>
                <button className="bg-marked-moderate-green/80 py-2 px-4 mb-4 uppercase cursor-pointer"
                 onClick={()=>{
                  googleLoginHandler()
                }}
                >Sign up</button>
               <motion.a href="https://github.com/boompow/marked_front" target="_blank" initial={{ y:10, opacity:0}} animate={{ y:0, opacity:1}} transition={{duration:0.5, delay:0.5}} className="py-2 px-4 mb-4 flex items-center justify-center gap-2 bg-marked-accent text-marked-dark-green cursor-pointer uppercase"><Github/>Star it</motion.a>
                {/* <button className="bg-marked-moderate-green/80 py-2 px-4 mb-4 flex items-center justify-center gap-2 cursor-pointer"><img src={chromeIcon} className="w-6 h-6"/>Add Chrome Extension</button>   */}
              </>  
              }
      </dialog>
    :null}
    
    </>
  )
}

export default NavLanding