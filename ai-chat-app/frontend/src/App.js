import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const sendMessage = async () => {
    const res = await axios.post("http://localhost:8000/echo", {
      text: message,
    });

    setReply(res.data.reply);
  };

  return (
    <div className="container">
      <div>
        <h1 className="App-header">Backend Test</h1>

        <input value={message} onChange={(e) => setMessage(e.target.value)} />

        <button onClick={sendMessage}>Send</button>

        <p>{reply}</p>
      </div>
    </div>
  );
}

export default App;
