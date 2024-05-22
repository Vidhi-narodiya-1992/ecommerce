import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
       navigate("/");
    }
  });

  const CollectData = async () => {
    console.warn("In frontend", name, email, password);
    const result = await axios.post("http://localhost:5002/register", {
      name,
      email,
      password,
    });
    // let result = await fetch("http://localhost:5000/register", {
    //   method: "post",
    //   body: JSON.stringify({ name, email, password }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // result = await result.json(); 
    localStorage.setItem("user", JSON.stringify(result));
    console.warn(result);

    if (result) {
      navigate("/");
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        className="inputBox"
        type="text"
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name"
      />
      <input
        className="inputBox"
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter E-mail"
      />
      <input
        className="inputBox"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
      />
      <button onClick={CollectData} className="appButton" type="button">
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
