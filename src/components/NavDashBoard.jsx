import { useState, useEffect } from "react";
import { useSession } from "../services/authClient";
import { DropdownMenu } from "@radix-ui/themes";
import {TextAlignJustify, X, Plus, Search} from "lucide-react"
import { NavLink, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logoutHandler } from "../services/authenticationHandlers";

import { BookAlert, CirclePlus, NotebookPen } from "lucide-react"
import CharacterCounter from "../components/CharacterCounter"
import { createLinkHandler } from "../services/linkHandlers"
import { addLinkStore } from "../store/linkSlice"
import { createCategoryHandler } from "../services/categoryHandlers"
import ModalContainer from "../components/ModalContainer"
import { addCategoryStore } from "../store/categorySlice"
import CategoryRow from "./CategoryRow";

const NavLanding = () => {
  const [modal, setModal] = useState(false);
  const {data:session} = useSession();
  const navigate = useNavigate()

  // search bar component setup
  const [searchText, setSearchText] = useState("")
  const currentCategories = useSelector(state=>state.categories.categories)
  const currentLinks = useSelector(state=>state.links.links)


  // mobile-version data
  const [currentTitle, setCurrentTitle] = useState("")
  const [currentDescription, setCurrentDescription] = useState("")
  const [addCategory, setAddCategory] = useState(false)

  const [currentURL, setCurrentURL] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [addLink, setAddLink] = useState(false)
  
  const dispatch = useDispatch()

  // const navigate = useNavigate()

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
    <div className="bg-black border-b border-white/40 px-10 h-[4rem] z-10 fixed top-0 left-0 flex items-center justify-between w-full">
      <NavLink to="/">
          <h1 className="text-white text-3xl font-black uppercase font-inter">MARKED</h1>
      </NavLink>
        {/* add search input here */}
        <div className="flex items-center gap-8 max-md:hidden border-amber-300">
            {/* search link */}
            <div className="flex flex-col font-suse w-[50vw] relative">
              <div className="flex items-center gap-4 ring ring-white/30 bg-none px-2">
                  <input type="text" className="outline-0 p-2 grow text-white w-full" placeholder="search your links" value={searchText} 
                  onChange={(e)=>{setSearchText(e.target.value)}}/>
                  <Search className="w-5 h-5 text-gray-400"/>
              </div>
              {
                searchText &&
                <ul className="w-full bg-marked-gray border-b border-x border-white/30 text-white max-h-[300px] scrollable overflow-y-auto z-80 absolute left-0 top-[100%] pb-4">
                  {
                    currentCategories?.length > 0 && currentCategories?.filter(category=>category?.title?.toLowerCase()?.includes(searchText.toLowerCase()))?.map((category)=>{
                      return(
                      <NavLink to={`/dashboard/${category?._id}`}>
                        <li className="border-b border-b-white/30 px-4 py-2 m-2 hover:border-0 hover:bg-slate-700 cursor-pointer"
                        onClick={()=>{setSearchText("")}}
                        >{category?.title}</li>
                      </NavLink>
                    )
                  })}
                  {
                    currentLinks?.length > 0 && currentLinks?.filter(link=>link?.title?.toLowerCase()?.includes(searchText.toLowerCase()))?.map((link)=>{
                      if(link?.hasCategory){
                        return(
                        <NavLink to={`/dashboard/${link?.categoryId}`}>
                          <li className="border-b border-b-white/30 px-4 py-2 m-2 hover:border-0 hover:bg-slate-700 cursor-pointer"
                           onClick={()=>{setSearchText("")}}
                          >{link?.title}</li>
                        </NavLink>
                      )
                      }

                      else{
                        return(
                            <NavLink to={`/dashboard`}>
                              <li className="border-b border-b-white/30 px-4 py-2 m-2 hover:border-0 hover:bg-slate-700 cursor-pointer" onClick={()=>{setSearchText("")}}>{link?.title}</li>
                            </NavLink>
                          )
                      }
                  })}
                </ul>
              }
            </div>
        </div>
      <div className="flex gap-6 items-center max-md:hidden relative border">
      {session &&
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <div className="profile-wrapper">
              {session?.user?.image ? 
              <img src={ session?.user?.image} alt="profile" className="profile cursor-pointer"/>:
              <div className="profile cursor-pointer"></div>  
              }
            </div>
          </DropdownMenu.Trigger>
          {
            session &&
                <DropdownMenu.Content className='p-2 bg-marked-gray border border-slate-600 z-80'>
                <DropdownMenu.Item className='outline-0'><p className='text-white text-xl px-2'>{session?.user?.name? session?.user?.name : "John Doe"}</p> </DropdownMenu.Item>
                <DropdownMenu.Item className='outline-0'><p className='italic text-marked-moderate-green p-2 text-lg w-full border-b border-b-gray-400'>{session?.user?.email}</p></DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item className='outline-0'><button className='logout-btn mt-4' onClick={()=>{
                  logoutHandler(navigate)
                  }}>Logout</button></DropdownMenu.Item>
              </DropdownMenu.Content>
              
              
            }
        </DropdownMenu.Root>
      } 
      </div>
      <TextAlignJustify onClick={()=>setModal(true)} className='text-marked-dark-green cursor-pointer hidden max-md:block'/>
      
      
      <ModalContainer modal={addLink} onClose={()=>{setAddLink(false)}}>
        <form action="" className="flex flex-col p-8 gap-3 w-full text-white font-suse" onSubmit={(e)=>{
          e.preventDefault()
          const newLink = {
            title: currentTitle,
            url: currentURL,
            description: currentDescription,
            categoryId: selectedCategory
          }

          createLinkHandler(newLink, addLinkStore, dispatch)
          setAddLink(false)
          setCurrentDescription("")
          setCurrentTitle("")
          setCurrentURL("")
          setSelectedCategory("")

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
            <div className="border border-white/40 bg-marked-gray select-wrapper relative" >
              <select name="category" id="category" className="appearance-none p-2 outline-0 border border-white/40 bg-marked-gray w-full"
              value={selectedCategory}
              onChange={(e)=>{setSelectedCategory(e.target.value)}}
              >
                <option value="">Uncategorized</option>
                {
                  currentCategories.map((category)=>{
                    return(
                      <option key={category?._id} value={category?._id} >{category?.title}</option>
                    )
                  })
                }
              </select>
            </div>
            <div className="flex items-center justify-between mt-2">
              <label htmlFor="description" className="text-sm uppercase font-bold mt-2">Description</label>
              <CharacterCounter char={currentDescription.length} max={200}/>
            </div>
            <textarea name="description" id="description" placeholder="Add Description" className="p-2 outline-0 border border-white/40 max-h-[150px] flex-1 resize-none"  value={currentDescription} onChange={(e)=>{if(e.target.value.length <= 200){setCurrentDescription(e.target.value)}}}></textarea>
            <button type="submit" className="update-btn mt-2">Create Link</button>
        </form>
      </ModalContainer>
      
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
            <div className="flex items-center justify-between mt-4">
              <label htmlFor="title" className="text-sm uppercase font-bold">Title</label>
              <CharacterCounter char={currentTitle.length} max={30}/>
            </div>
            <input id="title" name="title" type="text" placeholder="Category Title" className="p-2 outline-0 border border-white/40" value={currentTitle} onChange={(e)=>{if(e.target.value.length <= 30){setCurrentTitle(e.target.value)}}} required/>
            <div className="flex items-center justify-between mt-4">
              <label htmlFor="description" className="text-sm uppercase font-bold">Description</label>
                <CharacterCounter char={currentDescription.length} max={200}/>
            </div>
            <textarea name="description" id="description" placeholder="Add Description" className="p-2 outline-0 border max-h-[150px] flex-1resize-none border-white/40 scrollable"  value={currentDescription} onChange={(e)=>{if(e.target.value.length <= 200){setCurrentDescription(e.target.value)}}}></textarea>
            <button type="submit" className="update-btn mt-4">Create Category</button>
        </form>
      </ModalContainer>

    </div>

    {/* Creating a navigation modal in mobile version */}
    {modal ?
      <dialog className={`hidden max-md:flex flex-col justify-start items-center text-2xl font-bold text-white gap-4 w-screen h-screen  bg-black p-8 m-0 z-40 absolute top-0 left-0`}>
        <span className="w-full flex justify-end items-center mb-8" >
          <X onClick={()=>setModal(false)}/>
        </span>
          {session &&
            <>
            <span className="flex items-center gap-4 w-full">
              { session?.user?.image ? 
              <img src={ session?.user?.image} alt="profile" className="profile !w-8 !h-8"/>:
              <div className="profile !w-8 !h-8"></div>}
              <p className='text-white font-marked-semibold'>{ session?.user?.name ? session?.user?.name : "John Doe"}</p> 
            </span>
            <p className='italic text-marked-moderate-green/80 text-xl w-full'>{session?.user?.email}</p>
            <hr className="my-3 w-full"/>
            <div className="w-full h-[50vh] overflow-auto scrollable py-4 font-marked-regular">
              <span className="flex items-center gap-2 w-full cursor-pointer hover:bg-marked-moderate-green/60 px-3 py-2">
                <NotebookPen className="w-5 h-5"/>
                <h1 onClick={()=>{
                  setModal(false)
                  setAddCategory(true)
                }}>New Category</h1>
              </span>
                
              {/* add link */}
              <span className="flex items-center gap-2 w-full cursor-pointer hover:bg-marked-moderate-green/60 px-3 py-2" onClick={()=>{
                setModal(false)
                setAddLink(true)}}><CirclePlus className="w-5 h-5"/>New Link</span>
                    
              <span className="flex items-center gap-2 w-full cursor-pointer hover:bg-marked-moderate-green/60 px-3 py-2" 
                onClick={()=>{
                  setModal(false)}}
              >
                <BookAlert className="w-5 h-5"/>
                <NavLink to={"/dashboard"}>
                  Uncatagorized
                </NavLink>
              </span>

              <details className="w-full px-3 py-2">
                <summary className="text-marked-moderate-green mt-2">Categories</summary>
                <div className="my-2 w-full overflow-y-auto scrollable flex-1 text-xl" onClick={()=>{
                        setModal(false)}}>
                  {
                    currentCategories.length > 0 && currentCategories.map((category)=>{
                      return <CategoryRow category={category} key={category?._id}/>
                    })
                  }
                </div>
              </details>
            </div>
                        
            <hr className="my-3 w-full"/>
            <div className='logout-btn !text-lg' onClick={()=>{
                setModal(false)
                logoutHandler(navigate)
                }}>Logout</div>
          </>
          
          }
      </dialog>
    :null}
    
    </>
  )
}

export default NavLanding