import React, { useContext, useEffect, useState } from "react";
import GetSummary from '../hooks/GetSummarys';
import { appContext } from "../context/appContext";

const Sidebar = ({ isOpen , toggleSidebar }) => {
   const { setSummaryId, setChange, setInputValue } = useContext(appContext);
   const { data } = GetSummary();
   const [summary, setSummary] = useState(null);
   const [deleteItem, setDeleteItem] = useState('');
   const url = 'http://localhost:5000/api';
   const [error, setError] = useState(null);


   useEffect(() => {
     if (data) {
       setSummary(data);
     }
   }, [data]); 

   useEffect(() => {
    const deleteSummaryItem = async () => {
      if (deleteItem) {
        try {
          const response = await fetch(`${url}/deletesummary/${deleteItem}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (!response.ok) {
            throw new Error('Error al obtener los datos');
          }
          setSummary(prevSummary => prevSummary.filter(item => item._id !== deleteItem));
        } catch (error) {
          setError(error);
        } 
      }
    };

    deleteSummaryItem();
  }, [deleteItem, url]); 


   const changeChat = (_id)=> {
      setSummaryId(_id);
      setChange(true);
      setInputValue("getchat")
   };
   const deleteSummary = (_id)=> {
    setDeleteItem(_id) 
   }

  return (
    <aside id="default-sidebar" 
      className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
        isOpen ? '' : 'hidden'
      }`} 
      aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <button className="block text-white m-5" onClick={toggleSidebar}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/>
              </svg>
            </button>
          </li>
          {
            summary && summary.length > 0 && summary.map(element => (
              <li className="flex items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white bg-gray-600 hover:bg-blue-800 group hover:text-white" key={element._id} >
                <span onClick={() => changeChat(element._id)}>{element.title}</span>
                <button className="ml-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:bg-red-600" onClick={() => deleteSummary(element._id)}>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm5 12.071L12.071 15 10 12.929 7.929 15 5 12.071 7.071 10 5 7.929 7.929 5 10 7.071 12.071 5 15 7.929 12.929 10 15 12.071z"/>
                  </svg>
                </button>
              </li>
            ))
          }

        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
