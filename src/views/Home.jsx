import { appContext } from "../context/appContext"
import ParticlesComponent from "../components/particlesBg"
import Response from "../components/response"
import Form from "../components/form"
import { useContext } from "react"


const MainContent = ({ toggleSidebar }) => {
    const {inputValue} = useContext(appContext)

    return (
      <main  >
        <div className="flex justify-start items-start ">
        <div>
        <button className="block text-white m-5" onClick={toggleSidebar}>
        <svg className="w-6 h-6"fill="none"stroke="currentColor"viewBox="0 0 24 24"xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round"strokeWidth="2"d="M4 6h16M4 12h16m-7 6h7"/></svg>
    </button>
        </div>
        </div>
        
  
        <div className="flex flex-col justify-center items-center w-full">
        <Form/>

        {inputValue && <Response/>}
        </div>

        <ParticlesComponent id="particles" />

      
      </main>
    )
}

export default MainContent;
