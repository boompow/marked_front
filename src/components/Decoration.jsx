import noise from "../assets/noise.svg";

const Decoration = () => {
  return (
    <>
    {/* decorations to make the background*/}
        <div className="grid grid-cols-[3rem_1fr_1fr_1fr] max-lg:grid-cols-[1fr_1fr] grid-rows-1 min-h-full w-full z-20 absolute top-0 left-0">
            <div className="border-r-white border-r"></div>
            <div className="border-r-white border-r"></div>
            <div className="border-r-white border-r"></div>
            <div className="border-r-white border-r"></div>
        </div>

        <div className="w-full min-h-full z-10 absolute top-0 left-0 opacity-30" style={{backgroundImage: `url(${noise})`}}>
        </div>
        <div className="block absolute bottom-0 left-0 z-0 w-full text-center">
            <h1 className="bg-gradient-to-tr from-marked-text-dark-green to-marked-text-light-green bg-clip-text text-transparent text-[clamp(4rem,22vw,22rem)] leading-[0.8] overflow-hidden font-marked-black">MARKED</h1>
        </div>
    </>
  )
}

export default Decoration