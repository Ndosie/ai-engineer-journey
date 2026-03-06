import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [recipient, setRecipient] = useState("");
  const [purpose, setPurpose] = useState("");
  const [tone, setTone] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateEmail = async () => {
    setIsLoading(true);
    if (!recipient || !purpose || !tone) {
      alert("Please fill all the fields");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/generate-email",
        {
          recipient,
          purpose,
          tone,
        },
      );

      setEmail(response.data.email);
    } catch (error) {
      alert(`There is an error: ${error}`);
    }
    setIsLoading(false);
  };

  return (
    <div className="container">
      <div className="content">
        <h1>Email Generator</h1>
        <div className="inputs">
          <input
            value={recipient}
            placeholder="Recipient"
            onChange={(e) => setRecipient(e.target.value)}
          />
          <input
            value={purpose}
            placeholder="Purpose"
            onChange={(e) => setPurpose(e.target.value)}
          />
          <input
            value={tone}
            placeholder="Tone"
            onChange={(e) => setTone(e.target.value)}
          />
        </div>
        <button onClick={generateEmail} disabled={isLoading}>
          Generate Email
        </button>
        <pre>
          {isLoading ? "Loading..." : email ? email : "Email will appear here."}
        </pre>
      </div>
    </div>
  );
}

export default App;
