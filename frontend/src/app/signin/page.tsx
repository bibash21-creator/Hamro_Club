"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const [form, setForm] = useState({ identifier: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 🚫 Backend login removed
    console.log("Sign in attempted with:", form);
    router.push("/feed"); // just redirect for now
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#121212] px-4">
      <div className="w-full max-w-md bg-white dark:bg-[#1e1e1e] rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Sign In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Username or Email
            </label>
            <input
              id="identifier"
              type="text"
              value={form.identifier}
              onChange={(e) => setForm({ ...form, identifier: e.target.value })}
              required
              className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter username or email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200">
            Sign In
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-purple-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}