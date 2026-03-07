import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const uploadPDF = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://127.0.0.1:8000/upload-pdf",
        formData,
      );

      alert(response.data.message);
    } catch (error) {
      alert(error);
    }
    setIsLoading(false);
  };

  const askQuestion = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/ask", { question });
      setAnswer(response.data.answer);
    } catch (error) {
      alert(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="container">
      <div className="content">
        <h1>PDF Questions and Answers</h1>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={uploadPDF} disabled={isLoading}>
          Upload PDF
        </button>

        <br />
        <br />

        <input
          placeholder="Ask a question"
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button onClick={askQuestion} disabled={isLoading}>
          Ask
        </button>

        <pre>
          {isLoading
            ? "Loading..."
            : answer
              ? answer
              : "Answer will appear here"}
        </pre>
      </div>
    </div>
  );
}

export default App;
