import NavDashBoard from "../components/NavDashBoard"
import { Outlet, NavLink } from "react-router"
import { getUserData } from "../services/userDataHandler"
import { useEffect, useState } from "react"
import { createCategoryHandler } from "../services/categoryHandlers"
import ModalContainer from "../components/ModalContainer"
import { useDispatch, useSelector } from "react-redux"
import { addCategoryStore, updateCategoriesArray } from "../store/categorySlice"
import { updateLinksArray } from "../store/linkSlice"
import CategoryRow from "../components/CategoryRow"
import { BookAlert, NotebookPen } from "lucide-react"

const Dashboard = () => {
  const [currentTitle, setCurrentTitle] = useState("")
  const [currentDescription, setCurrentDescription] = useState("")
  const [addCategory, setAddCategory] = useState(false)
  
  const dispatch = useDispatch()
  const currentCategories= useSelector((state)=>state.categories.categories)
  const currentLinks= useSelector((state)=>state.links.links)

  // draggable sidebar setup
  const [isDraggable, setIsDraggable] = useState(false)
  const [sidebarWidth, setSidebarWidth] = useState(200)

  const startDrag= ()=>{setIsDraggable(true)}
  const stopDrag= ()=>{setIsDraggable(false)}
  const maxWidth = window.innerWidth * 0.75;

  const onDrag = (e)=>{
    if(!isDraggable) return;
    // set upper and lower limit to the drag
    if(e.clientX > 200 && e.clientX < maxWidth){
      setSidebarWidth(e.clientX)
    }
  }


  useEffect(()=>{
    async function getData(){
      const response = await getUserData()
      const {links, categories} = response
      if(links){
        dispatch(updateLinksArray(links))
      }

      if(categories){
        dispatch(updateCategoriesArray(categories))
      }
    }

    if(!currentCategories?.length && !currentLinks?.length){
      getData()
    }

  }, [currentCategories, currentLinks, dispatch])

  return (
    <div className='h-screen w-screen bg-black flex flex-col'>
      {/* navbar */}
      <NavDashBoard/>

      {/* container */}
      <div className="flex mt-[4rem] w-full flex-1 overflow-hidden"
        onMouseMove={onDrag}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        {/* sidebar */}
          <div className="flex flex-col h-full items-center p-4 gap-2" style={{width: `${sidebarWidth}px`}}>
            <span className="flex items-center gap-2 w-full cursor-pointer hover:bg-marked-moderate-green/60 px-3 py-2 text-white">
                <NotebookPen className="w-5 h-5"/>
                <h1 className="font-regular text-lg" onClick={()=>{
                  setAddCategory(true)
                }}>New Category</h1>
               </span>
              <span className="flex items-center gap-2 w-full cursor-pointer hover:bg-marked-moderate-green/60  px-3 py-2 text-white">
                <BookAlert className="w-5 h-5"/>
                <NavLink to={"/dashboard"} className="font-regular text-lg">
                  Uncatagorized
                </NavLink>
              </span>
            <div className="w-full">
              <h1 className="text-marked-moderate-green font-bold uppercase text-lg mt-4">Categories</h1>
              <div className="my-2 w-full overflow-y-auto scrollable flex-1">
                {
                  currentCategories.length > 0 && currentCategories.map((category)=>{
                    return <CategoryRow category={category} key={category?._id}/>
                  })
                }
              </div>
            </div>
          </div>

          <ModalContainer modal={addCategory} onClose={()=>{setAddCategory(false)}}>
            <form action="" className="flex flex-col p-8 gap-3 w-full text-white font-suse" onSubmit={(e)=>{
              e.preventDefault()
              const newCategory = {
                title: currentTitle,
                description: currentDescription,
              }

              createCategoryHandler(newCategory, addCategoryStore, dispatch)
              setAddCategory(false)
              setCurrentDescription("")
              setCurrentTitle("")
  
            }}>
                <h1 className="font-bold uppercase text-2xl text-center w-full mb-4">Create New Category</h1>
                <label htmlFor="title" className="text-sm uppercase font-bold">Title</label>
                <input id="title" name="title" type="text" placeholder="Category Title" className="p-2 outline-0 border border-white/40" value={currentTitle} onChange={(e)=>{setCurrentTitle(e.target.value)}}/>
                <label htmlFor="description" className="text-sm uppercase font-bold">Description</label>
                <textarea name="description" id="description" placeholder="Add Description" className="p-2 outline-0 border border-white/40"  value={currentDescription} onChange={(e)=>{setCurrentDescription(e.target.value)}}></textarea>
                <button type="submit" className="update-btn">Create Category</button>
            </form>
          </ModalContainer>

        {/* divider */}
        <div className="w-2 h-full cursor-col-resize border-r border-white/40 " onMouseDown={startDrag}></div>

        {/* main */}
        <div className="flex flex-col overflow-y-auto scrollable h-full flex-1"><Outlet/></div>
        
      </div>
      
      
      {/* footer */}
      <div className="border-t border-white/40 h-[3rem] w-full flex items-center justify-center p-2 font-inter">
          <p className="text-slate-800">Made with ❤️ by <a className="hover:text-marked-moderate-green" href="https://github.com/boompow" target="_blank">Boom</a></p>
      </div>
    </div>
  )
}

export default Dashboard