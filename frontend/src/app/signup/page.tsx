"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 🚫 Backend signup removed
    console.log("Sign up attempted with:", form, image);
    router.push("/signin"); // just redirect for now
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#121212] px-4">
      <div className="w-full max-w-md bg-white dark:bg-[#1e1e1e] rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
              className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Choose a username"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="name@example.com"
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
              placeholder="Enter a strong password"
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Profile Image
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              required
              className="mt-1 w-full text-gray-900 dark:text-white"
            />
          </div>

          <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200">
            Register
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link href="/signin" className="text-purple-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}