import { useState, useEffect } from "react";
import axios from "axios";

// Replace with your Railway backend URL
const API_URL = "https://intellidefend-backend.railway.app";

function App() {
  const [apiStatus, setApiStatus] = useState("checking...");
  const [testData, setTestData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      // Test 1: Health check
      const healthResponse = await axios.get(`${API_URL}/api/health`);
      console.log("Health check:", healthResponse.data);
      setApiStatus("✅ Connected");

      // Test 2: Get test data
      const testResponse = await axios.get(`${API_URL}/api/test`);
      console.log("Test data:", testResponse.data);
      setTestData(testResponse.data);
    } catch (err) {
      console.error("Connection error:", err);
      setError(err.message);
      setApiStatus("❌ Connection failed");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <div style={{
        background: "white",
        borderRadius: "16px",
        padding: "40px",
        maxWidth: "600px",
        width: "90%",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
      }}>
        <h1 style={{ 
          fontSize: "32px", 
          fontWeight: "bold", 
          marginBottom: "24px",
          color: "#1a202c"
        }}>
          🛡️ IntelliDefend
        </h1>

        <div style={{
          background: apiStatus.includes("✅") ? "#d4edda" : "#f8d7da",
          padding: "16px",
          borderRadius: "8px",
          marginBottom: "24px",
          border: `2px solid ${apiStatus.includes("✅") ? "#28a745" : "#dc3545"}`
        }}>
          <strong>Backend Status:</strong> {apiStatus}
        </div>

        {error && (
          <div style={{
            background: "#fff3cd",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "16px",
            color: "#856404"
          }}>
            Error: {error}
          </div>
        )}

        {testData && (
          <div>
            <h2 style={{ fontSize: "20px", marginBottom: "16px", color: "#2d3748" }}>
              📊 Test Data from Backend
            </h2>
            <div style={{
              background: "#f7fafc",
              padding: "20px",
              borderRadius: "8px",
              border: "1px solid #e2e8f0"
            }}>
              <p><strong>Message:</strong> {testData.message}</p>
              <p><strong>Security Score:</strong> {testData.data.security_score}/100</p>
              <p><strong>Vulnerabilities:</strong> {testData.data.vulnerabilities_found}</p>
              <p><strong>Last Scan:</strong> {new Date(testData.data.last_scan).toLocaleString()}</p>
            </div>
          </div>
        )}

        <button
          onClick={checkConnection}
          style={{
            marginTop: "24px",
            width: "100%",
            padding: "12px",
            background: "#667eea",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
          onMouseOver={(e) => e.target.style.background = "#5568d3"}
          onMouseOut={(e) => e.target.style.background = "#667eea"}
        >
          🔄 Refresh Connection
        </button>
      </div>
    </div>
  );
}

export default App;
