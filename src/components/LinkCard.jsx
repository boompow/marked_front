import { Ellipsis } from "lucide-react"
import { DropdownMenu } from "@radix-ui/themes"
import ModalContainer from "./ModalContainer"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import { updateLinkHandler, deleteLinkHandler, addLinkToCategory } from "../services/linkHandlers"
import { NavLink } from "react-router"
import { deleteLinkStore, editLinkStore } from "../store/linkSlice"

import { motion } from "motion/react"


const cardVariant = {
  hidden:{opacity:0, y:30},
  show:{
    opacity:1,
    y:0,
    transition:{duration:0.5}
  }
}

const LinkCard = ({link}) => {
  const [editLink, setEditLink] = useState(false);
  const categories = useSelector((state)=>state.categories.categories)
  const [currentTitle, setCurrentTitle] = useState(link?.title ? link?.title : "")
  const [currentURL, setCurrentURL] = useState(link?.url ? link?.url : "")
  const [currentDescription, setCurrentDescription] = useState(link?.description ? link?.description : "")

  const dispatch = useDispatch()

  const [deleteLink, setDeleteLink] = useState(false)


  return (
    <motion.div 
    variants={cardVariant}
    initial="hidden"
    animate="show"
    className='group flex flex-col w-[100%] max-w-[350px] min-h-[350px] shrink-0 px-3 pb-3 pt-1 m-4 border border-white/40 items-center justify-center'>
       <span className="flex items-center justify-end w-full">
       <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Ellipsis className="h-5 text-white cursor-pointer"/>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className='p-2 rounded-md bg-black border border-slate-600 z-90'>
             <DropdownMenu.Item className='outline-0 empty-btn' onClick={()=>{setEditLink(true)}}>Edit</DropdownMenu.Item>
             <DropdownMenu.Sub >
              <DropdownMenu.SubTrigger className='outline-0 empty-btn flex items-center gap-2'>Categorize</DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent className='p-2 rounded-md bg-black border border-slate-600 z-90'>
                {
                    categories.length > 0 && categories.map((category)=>{
                      return(
                        <DropdownMenu.Item key={category?._id} className='outline-0 empty-btn' onClick={()=>{
                          addLinkToCategory(link?._id, category?._id, editLinkStore, dispatch)
                        }}>{category?.title}</DropdownMenu.Item>
                      )
                    })
                }
              </DropdownMenu.SubContent>
             </DropdownMenu.Sub>
             <DropdownMenu.Item className='outline-0'><button className='logout-btn mt-2' onClick={()=>{
              setDeleteLink(true)
             }}>Delete</button></DropdownMenu.Item>
        </DropdownMenu.Content>
       </DropdownMenu.Root>
       </span>
       <NavLink to={link?.url ? link?.url :"/dashboard"} target='_blank' className='bg-none w-full flex-1 flex flex-col gap-2'>
          <div className='flex-1 bg-pink-400'></div>
          <p className="text-white p-2 font-bold hover:text-green-500 capitalize">{link?.title ? link?.title : "link name"}</p>
       </NavLink>
        <div className="p-2 my-2 w-full h-[80px] bg-marked-gray text-white hidden group-hover:flex">
          <p>{link?.description ? link?.description : "add remark"}</p>
        </div>



        {/* modals */}

        {/* edit Link */}
        <ModalContainer modal={editLink} onClose={()=>{setEditLink(false)}}>
          <form action="" className="flex flex-col p-8 gap-3 w-full text-white font-suse" onSubmit={(e)=>{
            e.preventDefault()
            const updatedLink = {
              title: currentTitle,
              url: currentURL,
              description: currentDescription
            }

            if(link?._id){
              updateLinkHandler(updatedLink, link?._id, editLinkStore, dispatch)
              setEditLink(false)
            }

          }}>
              <h1 className="font-bold uppercase text-2xl text-center w-full mb-4">Edit Link</h1>
              <label htmlFor="title" className="text-sm uppercase font-bold">Title</label>
              <input id="title" name="title" type="text" placeholder="Link Title" className="p-2 outline-0 border border-white/40" value={currentTitle} onChange={(e)=>{setCurrentTitle(e.target.value)}}/>
              <label className="text-sm uppercase font-bold mt-2" htmlFor="url">URL</label>
              <input id="url" type="url" name="url" placeholder="Link URL" className="p-2 outline-0 border border-white/40"  value={currentURL} onChange={(e)=>{setCurrentURL(e.target.value)}}/>
              <label htmlFor="description" className="text-sm uppercase font-bold mt-2">Remark</label>
              <textarea name="description" id="description" placeholder="Add Remark" className="p-2 outline-0 border border-white/40"  value={currentDescription} onChange={(e)=>{setCurrentDescription(e.target.value)}}></textarea>
              <button type="submit" className="update-btn">Update Link</button>
          </form>
        </ModalContainer>


        {/* delete Link */}
        <ModalContainer modal={deleteLink} onClose={()=>{setDeleteLink(false)}}>
          <form action="" className="flex flex-col py-4 px-8 gap-3 w-full text-white font-suse" onSubmit={(e)=>{
            e.preventDefault()
            if(link?._id){
                deleteLinkHandler(link?._id, deleteLinkStore, dispatch)
                setDeleteLink(false)
              }
          }}>
            <p >Are you sure you want to delete this link?</p>
            <div className="flex items-center w-[90%] gap-8 my-4">
              <button className="edit-btn" onClick={()=>{
                setDeleteLink(false)
              }}>Cancel</button>
              <button className="logout-btn" type="submit">Delete</button>
            </div>
          </form>
        </ModalContainer>
    </motion.div>
  )
}

export default LinkCard