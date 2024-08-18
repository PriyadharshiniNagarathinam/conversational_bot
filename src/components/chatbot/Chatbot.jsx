import { useState, useRef, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FiSend } from "react-icons/fi";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState("");
  const [image, setImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const messageEndRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setMessages([
        ...messages,
        { type: "image", content: file.name, sender: "user" },
      ]);
    }
  };

  const handleSend = () => {
    if (query.trim()) {
      setMessages([
        ...messages,
        { type: "text", content: query, sender: "user" },
      ]);
      setQuery("");
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "text", content: "This is a bot response", sender: "bot" },
        ]);
      }, 1000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex min-h-screen bg-gray-light">
      <div className="w-1/4 bg-black text-white p-4 space-y-2 overflow-y-auto">
        <div className="mb-2 text-xl font-bold">Previous Chats</div>
        <div className="space-y-2">
          <div className="bg-gray-800 p-2 rounded">
            <div>08/18/2024</div>
            <div className="text-sm text-gray-400">Chat 1</div>
          </div>
          <div className="bg-gray-800 p-2 rounded">
            <div>08/17/2024</div>
            <div className="text-sm text-gray-400">Chat 2</div>
          </div>
          <div className="bg-gray-800 p-2 rounded">
            <div>08/16/2024</div>
            <div className="text-sm text-gray-400">Chat 3</div>
          </div>
        </div>
      </div>

      <div className="flex-grow flex flex-col">
        <div className="flex-grow overflow-y-auto p-4">
          <div className="max-w-2xl mx-auto space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start ${
                  msg.sender === "user" ? "justify-end" : ""
                }`}
              >
                {msg.sender === "bot" && (
                  <Avatar className="mr-2">
                    <AvatarImage
                      src="https://via.placeholder.com/40"
                      alt="Bot"
                    />
                    <AvatarFallback>Bot</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-xs p-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-dark text-white"
                  }`}
                >
                  {msg.type === "image" ? (
                    <img
                      src={image}
                      alt="uploaded"
                      className="w-full h-auto rounded-md"
                    />
                  ) : (
                    msg.content
                  )}
                </div>
                {msg.sender === "user" && (
                  <Avatar className="ml-2">
                    <AvatarImage
                      src="https://via.placeholder.com/40"
                      alt="User"
                    />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
        </div>
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="max-w-2xl mx-auto flex items-center">
            <input
              type="text"
              className="border rounded-lg flex-grow p-2 mr-2"
              placeholder="Ask your query..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <FiSend
              onClick={handleSend}
              className="cursor-pointer text-2xl text-blue-600"
            />
          </div>
          <div className="mt-4 max-w-2xl mx-auto">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-gray-dark text-white p-2 rounded-lg w-full"
            >
              Upload Image
            </button>
          </div>
        </div>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black bg-opacity-25"></div>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-4">
            <Dialog.Title>Upload an Image</Dialog.Title>
            <input type="file" onChange={handleImageUpload} className="mt-4" />
            <button
              onClick={() => setIsOpen(false)}
              className="bg-black text-white p-2 mt-4 rounded-lg"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
