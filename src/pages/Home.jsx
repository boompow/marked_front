import Decoration from "../components/Decoration"


const Home = () => {
  return (
    <div className='max-w-[100vw] w-[100%] min-h-[100vh] h-[100%] background relative -z-50'>
        
    {/* Hero Section */}
    <div className="border border-red-600 z-0 flex flex-col max-md:items-center items-start  w-full min-h-screen px-[6rem]">
        <h1 className="uppercase text-[clamp(2.5rem,10vw,8rem)] text-white font-marked-black">ALL YOUR BOOKMARKS IN ONE PLACE.</h1>
        <p className="border border-red-600 text-start text-white text-[clamp(1rem,1vw,2rem)] font-marked-semibold tracking-widest uppercase leading-10 mb-8 max-lg:mb-12">Easily organize, access, and manage all your favorite links from anywhere—fast, simple, and clutter-free.</p>
        <button className="text-3xl font-marked-black text-marked-dark-green bg-marked-accent rounded-xl cursor-pointer px-10 py-5 mb-8">GET STARTED</button>
    </div>
        
        
        
    <Decoration/>
    </div>
  )
}

export default Home