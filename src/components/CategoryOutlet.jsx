import { useParams } from "react-router"
import { useSelector } from "react-redux"
import LinkCard from "./LinkCard"
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

const CategoryOutlet = () => {
  const {categoryId} = useParams()
  const currentCategory = useSelector((state)=>state.categories.categories?.find(category=>category?._id === categoryId)) ?? []
  const currentLinks = useSelector((state)=>state.links.links)
  return (
    <>
      <div className="flex flex-col gap-2 items-start m-4">
        <h1 className="peer text-green-950 font-marked-bold text-2xl font-inter bg-marked-moderate-green/80 p-4 w-full">{currentCategory?.title}</h1>
        {
          currentCategory?.description ?
          <p className="p-3 bg-green-950 text-white w-full opacity-0 peer-hover:opacity-100">{currentCategory?.description}</p>
          : <p className="p-3 bg-green-950 text-white w-full opacity-0 group-hover:opacity-100">Add Remark</p>
        }
      </div>
      <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="font-suse flex flex-wrap">
        {
          currentLinks.length > 0 ? currentLinks.filter(link=>link?.hasCategory && link?.categoryId === categoryId).map((link)=>{
              return <LinkCard link={link} key={link?._id}/>
            }
          ):
          <p className="text-white w-full text-center">No saved links in this category</p>
        }
      </motion.div>
    </>
  )
}

export default CategoryOutlet