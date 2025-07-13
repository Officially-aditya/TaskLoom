"use client";

import { use, useState } from "react";

export default function SignupPage({ onSuccess }: { onSuccess: () => void }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (res.ok) {
      setSuccess("Account created successfully!");
      onSuccess();
    } else {
      setError(data.message || "Signup failed");
    }
  };

  return (
    <form
      onSubmit={handleSignup}
      className="max-w-md mx-auto p-6 bg-white rounded-xl border shadow"
    >
      <h2 className="text-xl font-semibold mb-4">Create an Account</h2>
      <input
        type="name"
        placeholder="First Name"
        className="w-full mb-3 px-4 py-2 border rounded"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
        />
      <input
        type="name"
        placeholder="Last Name"
        className="w-full mb-3 px-4 py-2 border rounded"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        />
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
      <input
        type="password"
        placeholder="Confirm Password"
        className="w-full mb-3 px-4 py-2 border rounded"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
      >
        Sign Up
      </button>
    </form>
  );
}
