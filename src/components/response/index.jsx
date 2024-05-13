import React, { useContext, useEffect, useRef, useState } from "react";
import { appContext } from "../../context/appContext";
import ChatMessage from "../ChatMessage";
import GetChat from "../../hooks/GetChat";
import SendUrl from "../../hooks/SendUrl";

export default function Response() {
  const { inputValue, change, summaryId, setChange, setSummaryId, setInputValue } = useContext(appContext);
  const [messages, setMessages] = useState([]);
  const { dataSummary } = SendUrl(inputValue);
  const { dataChat } = GetChat(summaryId);
  const [titleChat, setTitle] = useState('');
  const [idChat, setIdChat ] =  useState(null);
  const consultRef = useRef(null)


  useEffect(() => {
    const handleKeyPress = async (e) => {
      if (e.code === 'Enter' && consultRef.current.value.trim() !== '') {
        const consult =   consultRef.current.value.trim()
        consultRef.current.value = ''
        setMessages(messages => [
          ...messages,
          { content: consult, role: "user" }
        ]);
        try {
          const response = await fetch('http://localhost:5000/api/newmessage', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              _id: idChat,
              message: consult
            })
          });
          if (!response.ok) throw new Error('Error in send url');
          const responseData = await response.json();
          setMessages(messages => [
            ...messages,
            responseData.summary
          ]);
          consultRef.current.value = ''

        } catch (error) {
          console.log(error)
        }
      }
    };
  
    const inputMessage = consultRef.current;
    inputMessage.addEventListener('keypress', handleKeyPress);
  
    return () => {
      inputMessage.removeEventListener('keypress', handleKeyPress);
    };
  }, [idChat]); 
  

  useEffect(() => {
    if (!change && dataSummary) {

      setMessages([
        { content: "give me the summary of this article", role: "user" },
        { content: dataSummary.message, role: "asistent" },
      ]);
      setSummaryId('')
      setTitle(dataSummary.title)
      setIdChat(dataSummary._id)

    } else if (change && dataChat) {
      const messagesNew = dataChat.messages.slice(1);
      setMessages(messagesNew);
      setInputValue('getchat')
      setTitle(dataChat.title)
      setIdChat(dataChat._id)



    } 
  }, [dataSummary, dataChat, change]);

  return (
    <div className="flex flex-col h-auto w-[90%] mt-28 mb-9 bg-zinc-800 rounded-xl space-y-4 py-7 divide-y divide-gray-600">
      <h1 className="text-2xl text-center text-white">{titleChat}</h1>
      <div className="snap-center p-3 text-center space-y-3 text-white">
        <div id="chat" className="flex flex-col">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              text={message.content}
              isSelf={message.role === "user" ? true : false}
            />
          ))}
        </div>
        <div>
          <div className="flex items-center justify-center">
            <div className="relative w-10/12">
              <input ref={consultRef} id="inputMessage" className="w-full border rounded-lg border-white bg-black focus:outline-none p-2 pl-10 text-white" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-2 right-2 w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
