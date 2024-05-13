import Sidebar from "./components/Sidebar";
import Home from './views/Home';
import { useState } from 'react';

export const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="">
  
      <Sidebar id="sidebar" isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Home toggleSidebar={toggleSidebar} />
    </div>
  );
};