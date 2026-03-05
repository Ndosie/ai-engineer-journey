import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    text: "",
    max_words: "",
    summary_style: "",
    summary_tone: "",
  });
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const summarizeText = async () => {
    setIsLoading(true);
    if (formData.text.split(" ").length < 100) {
      alert("Please enter a text with more than 100 words.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/summarize", {
        ...formData,
        max_words: formData.max_words ? Number(formData.max_words) : 100,
        summary_style: formData.summary_style
          ? formData.summary_style
          : "bullet",
        summary_tone: formData.summary_tone ? formData.summary_tone : "formal",
      });

      setSummary(res.data.summary);
      setFormData((prevData) => ({
        ...prevData,
        text: "",
        summary_style: "",
        summary_tone: "",
      }));
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
          value={formData.text}
          name="text"
          cols={40}
          rows={15}
          onChange={handleChange}
          placeholder="Text to summarize with more than 100 words"
        ></textarea>
        <div className="format">
          <input
            value={formData.max_words}
            name="max_words"
            onChange={handleChange}
            placeholder="Max words, default is 100"
            type="number"
          />
          <input
            value={formData.summary_style}
            name="summary_style"
            onChange={handleChange}
            placeholder="Style default is bullet"
            list="styles"
            type="data"
          />
          <datalist id="styles">
            <option>bullet</option>
            <option>paragraph</option>
            <option>executive</option>
          </datalist>
          <input
            value={formData.summary_tone}
            name="summary_tone"
            onChange={handleChange}
            placeholder="Tone default is formal"
            list="tones"
            type="data"
          />
          <datalist id="tones">
            <option>formal</option>
            <option>casual</option>
            <option>academic</option>
          </datalist>
        </div>
        <button onClick={summarizeText} disabled={isLoading}>
          Send
        </button>
        {isLoading ? (
          <p>Loading....</p>
        ) : (
          <pre>{summary ? summary : "Summary will appear here!"}</pre>
        )}
      </div>
    </div>
  );
}

export default App;
