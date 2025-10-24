import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/")
      .then(res => setData(res.data.message))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{data || "Connecting to API..."}</h1>
    </div>
  );
}

export default App;
