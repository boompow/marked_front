import { useSelector } from "react-redux"
import LinkCard from "./LinkCard"
import { CircleAlert } from "lucide-react"
import { motion } from "motion/react"

const containerVariants = {
  hidden:{opacity: 0},
  show:{
    opacity:1,
    transition:{
      staggerChildren: 0.5,
      delayChildren:0.5
    }
  }
}

const UncategorizedOutlet = () => {
  const currentLinks = useSelector((state)=>state.links.links)

  return (
    <>
      <div className="flex gap-2 items-center justify-start m-4  bg-yellow-400 p-4 font-marked-bold text-yellow-950">
        <CircleAlert/>
        <h1 className="text-2xl font-inter">Uncatagorized</h1>
      </div>
       <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="font-suse flex flex-wrap">
        {
          currentLinks.length > 0 ? currentLinks.filter(link => !link?.hasCategory).map((link)=>{
              return <LinkCard link={link} key={link?._id}/>
            }
          ):
          <p className="text-white w-full text-center">No uncatagorized links</p>
        }
      </motion.div>
    </>
  )
}

export default UncategorizedOutlet