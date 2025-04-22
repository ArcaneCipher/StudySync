import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../features/auth/authSlice";
import Button from './Button';
import Input from './Input';
import logo from '../assets/logo.png';

const Auth = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const response = await fetch("/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      dispatch(loginSuccess(data.user));
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  };

  return (
    <div className="login">
      <div>
        <div className="studysync-intro">
          <h1>Master Anything,<br /> One Flashcard at a Time.</h1>
          <p>
            StudySync helps you remember more in less time with smart, spaced repetition flashcards. Whether you're prepping for exams or learning new skills — we've got you covered.
          </p>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="auth-form">
          <img src={logo} alt="StudySync" className="logo"/>
          <Input 
            type="email"
            value={email}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            required />
            <Input 
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              required 
            />
            <Button variant="primary" type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
