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
    if (
      formData.text.split(" ").length < 100 ||
      !formData.summary_style ||
      !formData.summary_tone
    ) {
      alert(
        "Please enter a text with more than 100 words and specify summary style and tone.",
      );
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/summarize", {
        ...formData,
        max_words: formData.max_words ? Number(formData.max_words) : 100,
      });

      setSummary(res.data.summary);
      setFormData((prevData) => ({ ...prevData, text: "", summary_style: "", summary_tone: "" }));
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
            placeholder="Summary style"
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
            placeholder="Summary tone"
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
          <p>{summary ? summary : "Summary will appear here!"}</p>
        )}
      </div>
    </div>
  );
}

export default App;
