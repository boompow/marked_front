import { DropdownMenu } from "@radix-ui/themes"
import { Ellipsis } from "lucide-react"
import { useState } from "react"
import { deleteCategoryHandler, updateCategoryHandler } from "../services/categoryHandlers"
import { editCategoryStore, deleteCategoryStore } from "../store/categorySlice"
import { useDispatch } from "react-redux"

import ModalContainer from "./ModalContainer"
import { NavLink } from "react-router"
import { useNavigate } from "react-router"
import { useParams } from "react-router"

import CharacterCounter from "./CharacterCounter"

const CategoryRow = ({category}) => {
    const [editCategory, setEditCategory] = useState(false)
    const [deleteCategory, setDeleteCategory] = useState(false)

    const [currentTitle, setCurrentTitle] = useState(category?.title ? category?.title : "")
    const [currentDescription, setCurrentDescription] = useState(category?.description ? category?.description : "")

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {categoryId} = useParams()



  return (
    <>
      <NavLink to={`/dashboard/${category?._id}`}  key={category?._id} className="flex items-center px-3 py-2 gap-2 cursor-pointer text-white hover:bg-marked-moderate-green/60 group" 
      style={categoryId === category?._id ? {backgroundColor: "rgba(91, 247, 24, 0.6)"} : null}
      >
          <p className="flex-1">{category?.title}</p>
      <DropdownMenu.Root>
          <DropdownMenu.Trigger>
          <Ellipsis className="opacity-0 group-hover:opacity-100"/>  
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className='p-2 rounded-md bg-black border border-slate-600 z-80'>
              <DropdownMenu.Item className='outline-0 empty-btn' onClick={()=>{setEditCategory(true)}}>Edit</DropdownMenu.Item>
              <DropdownMenu.Item className='outline-0'><button className='logout-btn mt-2' onClick={()=>{
              setDeleteCategory(true)
              }}>Delete</button></DropdownMenu.Item>
          </DropdownMenu.Content>
      </DropdownMenu.Root>
      </NavLink>

        {/* category edit */}
        <ModalContainer modal={editCategory} onClose={()=>{setEditCategory(false)}}>
            <form action="" className="flex flex-col p-8 gap-3 w-full text-white font-suse" onSubmit={(e)=>{
              e.preventDefault()
              const newCategory = {
                title: currentTitle,
                description: currentDescription,
              }

              updateCategoryHandler(newCategory, category?._id, editCategoryStore, dispatch)
              setEditCategory(false)
              setCurrentDescription("")
              setCurrentTitle("")
  
            }}>
                <h1 className="font-bold uppercase text-2xl text-center w-full mb-4">Edit Category</h1>
                <div className="flex items-center justify-between mt-4">
                  <label htmlFor="title" className="text-sm uppercase font-bold">Title</label>
                  <CharacterCounter char={currentTitle.length} max={30}/>
                </div>
                <input id="title" name="title" type="text" placeholder="Category Title" className="p-2 outline-0 border border-white/40" value={currentTitle} onChange={(e)=>{if(e.target.value.length <= 30){setCurrentTitle(e.target.value)}}} required/>
                <div className="flex items-center justify-between mt-4">
                  <label htmlFor="description" className="text-sm uppercase font-bold">Description</label>
                    <CharacterCounter char={currentDescription.length} max={200}/>
                </div>
                <textarea name="description" id="description" placeholder="Add Description" className="p-2 outline-0 border max-h-[150px] flex-1 resize-none border-white/40 scrollable"  value={currentDescription} onChange={(e)=>{if(e.target.value.length <= 200){setCurrentDescription(e.target.value)}}}></textarea>                                
                <button type="submit" className="update-btn">Edit Category</button>
            </form>
          </ModalContainer>


          {/* category delete */}
          <ModalContainer modal={deleteCategory} onClose={()=>{setDeleteCategory(false)}}>
            <form action="" className="flex flex-col py-4 px-8 gap-3 w-full text-white font-suse" onSubmit={(e)=>{
                e.preventDefault()
                if(category?._id){
                    deleteCategoryHandler(category?._id, navigate, deleteCategoryStore, dispatch)
                    setDeleteCategory(false)
                }
            }}>
                <p >Are you sure you want to delete this category?</p>
                <div className="flex items-center w-[90%] gap-8 my-4">
                <button className="edit-btn" onClick={()=>{
                    setDeleteCategory(false)
                }}>Cancel</button>
                <button className="logout-btn" type="submit">Delete</button>
                </div>
            </form>
            </ModalContainer>
    </>
  )
}

export default CategoryRow