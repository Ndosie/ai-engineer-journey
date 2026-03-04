import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    setIsLoading(true);
    if (!message) {
      alert("Please enter a message.");
      setIsLoading(false);
      return;
    }
    try {
      const res = await axios.post("http://localhost:8000/chat", {
        text: message,
      });
      setChats([...chats, `Client: ${message}`, res.data.reply.toUpperCase()]);
      setMessage("");
    } catch (error) {
      alert(`There an error: ${error}`);
    }
    setIsLoading(false);
  };

  return (
    <div className="container">
      <div>
        <h1 className="App-header">Backend Test</h1>

        <input value={message} onChange={(e) => setMessage(e.target.value)} />

        <button onClick={sendMessage} disabled={isLoading}>
          Send
        </button>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>{chats.map((chat) => <p>{chat}</p>)}</div>
        )}
      </div>
    </div>
  );
}

export default App;
