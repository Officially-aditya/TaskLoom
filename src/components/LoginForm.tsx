"use client";

import React, { useState, Dispatch, SetStateAction } from "react";

interface LoginFormProps {
  onSuccess: () => void;
  setShowSignupPage: Dispatch<SetStateAction<boolean>>;
  setShowLoginPage: Dispatch<SetStateAction<boolean>>;
  setActiveNav: Dispatch<SetStateAction<string>>;
}

export default function LoginForm({
  onSuccess,
  setShowSignupPage,
  setShowLoginPage,
  setActiveNav,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (res.ok) {
      onSuccess();
    } else {
      setError(data.message || "Login failed");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-md mx-auto p-6 bg-white rounded-xl border shadow"
    >
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full mb-3 px-4 py-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full mb-3 px-4 py-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
      >
        Login
      </button>
      <p className="text-sm mt-4 text-center text-gray-600">
        Don't have an account?{" "}
        <span
          onClick={() => {
            setShowLoginPage(false);
            setShowSignupPage(true);
            setActiveNav("Signup");
          }}
          className="text-indigo-600 cursor-pointer hover:underline"
        >
          Sign Up
        </span>
      </p>
    </form>
  );
}
