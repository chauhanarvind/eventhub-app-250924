"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const SignIn = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = async () => {
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        Cookies.set("token", data.token, { expires: 1 }); // Save token to cookies
        router.push("/uni-events");
      } else {
        const data = await res.json();
        setError(data.message || "Failed to sign in.");
      }
    } catch (error) {
      setError("An error occurred while signing in.");
    }
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <div>
      <h2>Sign In</h2>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="username"
        className="mb-2 p-2 border"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        className="mb-2 p-2 border"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleSignIn}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Sign In
      </button>
      <button
        onClick={handleRegister}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Register
      </button>
    </div>
  );
};

export default SignIn;
