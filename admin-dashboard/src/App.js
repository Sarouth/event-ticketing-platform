/*import logo from './logo.svg';
import './App.css';

//below are according to ChatGPT
// src/App.js
import React, { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import EventsList from "./pages/EventsList";
import BookingsList from "./pages/BookingsList";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  const [tokens, setTokens] = useState(() => {
    const raw = localStorage.getItem("tokens");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (tokens) localStorage.setItem("tokens", JSON.stringify(tokens));
    else localStorage.removeItem("tokens");
  }, [tokens]);

  if (!tokens) {
    return <LoginPage onLogin={(t) => setTokens(t)} />;
  }

  const access = tokens.access;

  const logout = () => setTokens(null);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", padding: 12, background: "#efefef" }}>
        <div>Admin Dashboard</div>
        <div>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ width: "70%" }}>
          <Dashboard token={access} />
        </div>
        <div style={{ width: "30%", borderLeft: "1px solid #ddd", paddingLeft: 12 }}>
          <EventsList token={access} />
          <BookingsList token={access} />
        </div>
      </div>
    </div>
  );
}

export default App;
*/ //for commenting can use ctrl+windows also!


// src/App.js
import React, { useEffect, useState } from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import EventsList from "./pages/EventsList";
import BookingsList from "./pages/BookingsList";

function App() {
  // store tokens in localStorage so refresh not lost when reloading dev page
  const [tokens, setTokens] = useState(() => {
    const raw = localStorage.getItem("tokens");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (tokens) localStorage.setItem("tokens", JSON.stringify(tokens));
    else localStorage.removeItem("tokens");
  }, [tokens]);

  if (!tokens) {
    return <LoginPage onLogin={(t) => setTokens(t)} />;
  }

  const access = tokens.access;
  const logout = () => setTokens(null);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 12,
          background: "#efefef",
        }}
      >
        <div>Admin Dashboard</div>
        <div>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ width: "70%" }}>
          <Dashboard token={access} />
        </div>
        <div
          style={{
            width: "30%",
            borderLeft: "1px solid #ddd",
            paddingLeft: 12,
          }}
        >
          <EventsList token={access} />
          <BookingsList token={access} />
        </div>
      </div>
    </div>
  );
}

export default App;

