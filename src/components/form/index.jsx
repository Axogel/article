/* eslint-disable no-unused-vars */

import { useContext } from "react"
import { appContext } from "../../context/appContext"

export default function Form() {

  const { search,
    setInputValue,
    empiti,
    setEmpiti,
    inputValue, setChange } = useContext(appContext)

  

  const submitValue = () => {

    if(search.current?.value.trim() === '') {
      setEmpiti(true)
      return
    }
    setEmpiti(false)
    console.log("se supone que se cambio la vainano jodas ", search.current?.value)
    setInputValue(String(search.current?.value))
    setChange(false)

  }



    return(
        <form onSubmit={e => {
            e.preventDefault()
            submitValue()
        }} className="mt-9 fixed top-2 bg-black border border-white rounded-lg p-1 w-30">
          <div className="flex flex-row justify-center items-center space-x-7">
            <input ref={search} type="text" name="search" id="search" placeholder="search..." className=" bg-black focus:outline-none p-2 text-white"/>

            {empiti && <p className="text-red-500">Enter to search</p>}

            <button type="submit" className="bg-button text-white p-2 rounded-lg text-base ">search</button>
          </div>
        </form>
    )
}