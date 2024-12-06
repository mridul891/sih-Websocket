import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const socket = useMemo(() => io("http://localhost:3000"), []);

  const handleSubmit = () => {
    console.log(message);
    socket.emit("message", message);
    setMessage(" ");
  };

  const webScrapperData = async () => {
    console.log("Reached Here");
    const response = await axios.get(
      "https://webscrapper-bmoc.onrender.com/info"
    );
    const data = response.data;

    data.map((elem) => {
      const title = elem.title;
      socket.emit("message", title);
    });
  };
  useEffect(() => {
    webScrapperData();
  }, []);
  return (
    <>
      <div className="w-[30vw] h-[40vh] mx-auto bg-black text-white border border-gray-700 rounded-lg shadow-lg p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <textarea
            type="text"
            placeholder="What's happening?"
            className="flex-1 bg-transparent text-lg h-[25vh] overflow-none placeholder-gray-500 focus:outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center border-t border-gray-700 pt-4">
          <button
            className={`px-4 py-2 rounded-full shadow ${
              message.trim()
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!message.trim()}
            onClick={handleSubmit}
          >
            Tweet
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
