import React from "react";

const ChatMessage = ({ text, isSelf }) => {
  const bgColor = isSelf ? "bg-blue-500 " : "bg-blue-900";
  const align = isSelf ? " place-self-end pl-5 mr-6 ms-16	" : "ms-6 mr-16";
  
  return (
    <div className={`p-2 my-3  rounded-md  text-left ${bgColor} ${align} w-[auto]`}>
      {text}
    </div>
  );
};

export default ChatMessage;
