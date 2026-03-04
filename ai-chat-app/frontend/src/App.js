import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([
    { role: "system", content: "You are a helpful assistant" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    setIsLoading(true);
    if (!message) {
      alert("Please enter a message.");
      setIsLoading(false);
      return;
    }
    try {
      const newChats = [...chats, { role: "user", content: message }];
      const res = await axios.post("http://localhost:8000/chat", {
        messages: newChats,
      });
      setChats([...newChats, { role: "assistant", content: res.data.reply }]);
      setMessage("");
    } catch (error) {
      alert(`There an error: ${error}`);
    }
    setIsLoading(false);
  };

  return (
    <div className="container">
      <div className="contents">
        <h1>AI Chat App</h1>

        <input value={message} onChange={(e) => setMessage(e.target.value)} />

        <button onClick={sendMessage} disabled={isLoading}>
          Send
        </button>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {chats.map((chat) => (
              <p>{chat.content}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
