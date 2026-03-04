import { use, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [maxWords, setMaxWords] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const summarizeText = async () => {
    setIsLoading(true);
    if (inputText.split(" ").length < 100) {
      alert("Please enter a text with more than 100 words");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/summarize", {
        text: inputText,
        max_words: maxWords ? Number(maxWords) : 100,
      });

      setSummary(res.data.summary);
      setInputText("");
    } catch (error) {
      alert(`There is an error: ${error}`);
    }
    setIsLoading(false);
  };

  return (
    <div className="container">
      <div className="content">
        <h1>AI Text Summarizer</h1>
        <textarea
          value={inputText}
          cols={40}
          rows={20}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Text to summarize with more than 100 words"
        ></textarea>
        <input
          value={maxWords}
          onChange={(e) => setMaxWords(e.target.value)}
          placeholder="Max word count, default is 100"
          type="number"
        />
        <button onClick={summarizeText} disabled={isLoading}>
          Send
        </button>
        {isLoading ? (
          <p>Loading....</p>
        ) : (
          <p>{summary ? summary : "Summary will appear here!"}</p>
        )}
      </div>
    </div>
  );
}

export default App;
