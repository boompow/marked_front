import Decoration from "../components/Decoration";
import NavLanding from "../components/NavLanding";
import { useSession } from "../services/authClient";
import { NavLink } from "react-router";
import { googleLoginHandler } from "../services/authenticationHandlers";
import {motion} from "motion/react"


const Home = () => {
  const {data:session} = useSession();

  return (
    <div className='w-screen h-screen background relative md:px-8 md:py-4'>
      <div className="z-30 w-full h-full relative flex flex-col items-center">
        <NavLanding/>
          
      {/* Hero Section */}
      <div className="z-0 flex flex-col items-center w-[90%] font-inter">
          <motion.h1 initial={{ y:20, opacity:0}} animate={{ y:0, opacity:1}} transition={{duration:0.5, delay:0.5}} className="uppercase text-[clamp(2.5rem,9vw,6rem)] text-green-950 font-marked-black text-center"
          >ALL YOUR BOOKMARKS IN ONE PLACE.</motion.h1>
          <motion.p initial={{ y:20, opacity:0}} animate={{ y:0, opacity:1}} transition={{duration:0.4, delay:1}} className="text-white text-[clamp(1rem,1.5vw,1.5rem)] font-marked-semibold tracking-widest w-[70%] uppercase leading-10 mb-8 max-lg:mb-12 text-center">Easily organize, access, and manage all your favorite links from anywhere—fast, simple, and clutter-free.</motion.p>

          {session ? 
            <NavLink to="/dashboard">
              <motion.button initial={{ y:20, opacity:0}} animate={{ y:0, opacity:1}} transition={{duration:0.3, delay:1.3}} className="text-xl uppercase font-marked-bold text-marked-dark-green bg-marked-accent rounded-xl cursor-pointer px-12 py-4 mb-8">go to dashboard</motion.button>
            </NavLink>
            :
            <motion.button initial={{ y:20, opacity:0}} animate={{ y:0, opacity:1}} transition={{duration:0.3, delay:1.3}}  className="text-xl uppercase font-marked-bold text-marked-dark-green bg-marked-accent rounded-xl cursor-pointer px-12 py-4 mb-8"
            onClick={()=>{
              googleLoginHandler()
            }}
            >GET STARTED</motion.button>
            }
      </div>
          
      </div>
        
        
    <Decoration/>
    </div>
  )
}

export default Home