import { useState, useEffect } from "react";
// import { useNavigate } from "react-router";
import { useSession } from "../services/authClient";
import { DropdownMenu } from "@radix-ui/themes";
import ModalContainer from "./ModalContainer";
import {TextAlignJustify, X, Plus, Search} from "lucide-react"
import { NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { logoutHandler } from "../services/authenticationHandlers";
import { createLinkHandler } from "../services/linkHandlers";
import { addLinkStore } from "../store/linkSlice";

import CharacterCounter from "./CharacterCounter";

const NavLanding = () => {
  const [modal, setModal] = useState(false);

  const [currentTitle, setCurrentTitle] = useState("")
  const [currentURL, setCurrentURL] = useState("")
  const [currentRemark, setCurrentRemark] = useState("")

  const [addLink, setAddLink] = useState(false)

  const {data:session} = useSession();

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // search bar component setup
  const [searchText, setSearchText] = useState("")
  const currentCategories = useSelector(state=>state.categories.categories)
  const currentLinks = useSelector(state=>state.links.links)

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
            {/* add link */}
            <button className="outline-0 p-3 bg-gray-900 hover:bg-marked-text-light-green/70 active:bg-marked-text-light-green/80 text-white cursor-pointer" onClick={()=>{setAddLink(true)}}><Plus className="w-4 h-4"/></button>
            
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
                  <label className="text-sm uppercase font-bold mt-4" htmlFor="url">URL</label>
                  <input id="url" type="url" name="url" required placeholder="Link URL" className="p-2 outline-0 border border-white/40"  value={currentURL} onChange={(e)=>{setCurrentURL(e.target.value)}}/>
                  <div className="flex items-center justify-between mt-4">
                    <label htmlFor="description" className="text-sm uppercase font-bold mt-2">Remark</label>
                    <CharacterCounter char={currentRemark.length} max={200}/>
                  </div>
                  <textarea name="description" id="description" placeholder="Add Remark" className="p-2 outline-0 border border-white/40 h-[150px] resize-none"  value={currentRemark} onChange={(e)=>{if(e.target.value.length <= 200){setCurrentRemark(e.target.value)}}}></textarea>
                  <button type="submit" className="update-btn mt-4">Create Link</button>
              </form>
            </ModalContainer>

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
                <DropdownMenu.Content className='p-2 rounded-md bg-black border border-slate-600 z-90'>
                <DropdownMenu.Item className='outline-0'><p className='text-white text-xl font-nora-bold px-2'>{session?.user?.name? session?.user?.name : "John Doe"}</p> </DropdownMenu.Item>
                <DropdownMenu.Item className='outline-0'><p className='italic text-white font-nora-regular p-2 text-lg w-full border-b border-b-gray-400'>{session?.user?.email}</p></DropdownMenu.Item>
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
    </div>

    {/* Creating a navigation modal in mobile version */}
    {modal ?
      <dialog className={`hidden max-md:flex flex-col justify-start items-center text-2xl font-bold text-nora-indigo gap-4 w-screen h-screen  bg-marked-accent p-8 m-0 z-40 absolute top-0 left-0 -translate-x-8 -translate-y-4`}>
            <X  onClick={()=>setModal(false)}/>
              {session &&
              <>
                <span className="py-2 flex items-center gap-4 w-full">
                  { session?.user?.image ? 
                  <img src={ session?.user?.image} alt="profile" className="profile !w-8 !h-8"/>:
                  <div className="profile !w-8 !h-8"></div>}
                  <p className='text-gray-800 font-marked-semibold'>{ session?.user?.name ? session?.user?.name : "John Doe"}</p> 
                </span>
                <p className='italic text-gray-800 font-nora-regular py-2 text-xl w-full'>{session?.user?.email}</p>
                <div className='logout-btn' onClick={()=>{
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