import { useParams } from "react-router"
import { useSelector } from "react-redux"
import LinkCard from "./LinkCard"
import { motion } from "motion/react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { createLinkHandler } from "../services/linkHandlers"
import { addLinkStore } from "../store/linkSlice"
import { Plus } from "lucide-react"
import ModalContainer from "./ModalContainer"
import CharacterCounter from "./CharacterCounter"

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
  const categories = useSelector((state)=>state.categories.categories)
  const currentCategory = useSelector((state)=>state.categories.categories?.find(category=>category?._id === categoryId)) ?? []
  const currentLinks = useSelector((state)=>state.links.links)

  
    const [currentTitle, setCurrentTitle] = useState("")
    const [currentURL, setCurrentURL] = useState("")
    const [currentRemark, setCurrentRemark] = useState("")
  
    const [addLink, setAddLink] = useState(false)

    const dispatch = useDispatch()


  return (
    <>
      <div className="flex flex-col gap-2 items-start m-4">
        <div className="peer bg-marked-moderate-green/80 p-4 w-full flex items-center justify-between">
          <h1 className="text-green-950 font-marked-bold text-2xl font-inter">{currentCategory?.title}</h1>
           {/* add link */}
            <button className="outline-0 p-2 bg-marked-moderate-green hover:bg-green-950 active:bg-green-900 hover:text-marked-moderate-green text-green-950 cursor-pointer font-black" onClick={()=>{setAddLink(true)}}><Plus className="w-4 h-4"/></button>
            
            <ModalContainer modal={addLink} onClose={()=>{setAddLink(false)}}>
              <form action="" className="flex flex-col p-8 gap-3 w-full text-white font-suse" onSubmit={(e)=>{
                e.preventDefault()
                const newLink = {
                  title: currentTitle,
                  url: currentURL,
                  description: currentRemark
                }
    
                createLinkHandler(newLink, addLinkStore, dispatch)
                setAddLink(false)
                setCurrentRemark("")
                setCurrentTitle("")
                setCurrentURL("")
    
              }}>
                  <h1 className="font-bold uppercase text-2xl text-center w-full mb-4">Create New Link</h1>
                  <div className="flex items-center justify-between">
                    <label htmlFor="title" className="text-sm uppercase font-bold">Title</label>
                    <CharacterCounter char={currentTitle.length} max={30}/>
                  </div>
                  <input id="title" name="title" required type="text" placeholder="Link Title" className="p-2 outline-0 border border-white/40" value={currentTitle} onChange={(e)=>{if(e.target.value.length <= 30){setCurrentTitle(e.target.value)}}}/>
                  <label className="text-sm uppercase font-bold mt-2" htmlFor="url">URL</label>
                  <input id="url" type="url" name="url" required placeholder="Link URL" className="p-2 outline-0 border border-white/40"  value={currentURL} onChange={(e)=>{setCurrentURL(e.target.value)}}/>
                  <label className="text-sm uppercase font-bold mt-2" htmlFor="category">Category</label>
                  <select name="category" id="category"  className="p-2 outline-0 border border-white/40 bg-marked-gray" >
                    {
                      categories.map((category)=>{
                        return(
                          <option value={category?._id} >{category?.title}</option>
                        )
                      })
                    }
                  </select>
                  <div className="flex items-center justify-between mt-2">
                    <label htmlFor="description" className="text-sm uppercase font-bold mt-2">Remark</label>
                    <CharacterCounter char={currentRemark.length} max={200}/>
                  </div>
                  <textarea name="description" id="description" placeholder="Add Remark" className="p-2 outline-0 border border-white/40 h-[150px] resize-none"  value={currentRemark} onChange={(e)=>{if(e.target.value.length <= 200){setCurrentRemark(e.target.value)}}}></textarea>
                  <button type="submit" className="update-btn mt-2">Create Link</button>
              </form>
            </ModalContainer>
        </div>
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