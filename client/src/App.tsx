import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

const App = () => {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    (async () => {
      if (name !== "") {
        const response = await fetch("http://localhost:8080/auth/user", {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const content = await response.json();

        setName(content.name);
      }
    })();
  });

  return (
    <>
      <BrowserRouter>
        <Navbar name={name} setName={setName} />
        <main>
          <Routes>
            <Route path="/" index Component={() => <Home name={name} />} />
            <Route
              path="/login"
              Component={() =>
                name === "" ? (
                  <Login setName={setName} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/register"
              Component={() =>
                name === "" ? <Register /> : <Navigate to="/" replace />
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
};

export default App;
