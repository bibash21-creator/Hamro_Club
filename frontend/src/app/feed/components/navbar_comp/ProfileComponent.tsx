"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  username: string;
  email: string;
  image_path?: string; // backend field
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:8000/users/me", {
      credentials: "include", // ✅ send cookies
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  if (!user) {
    return (
      <div className="profile_pic border rounded-2xl w-10 h-10 border-green-500 flex items-center justify-center">
        <span className="text-xs text-gray-500">No user</span>
      </div>
    );
  }

  return (
    <div
      className="profile_pic border rounded-2xl w-10 h-10 border-green-500 overflow-hidden cursor-pointer"
      onClick={() => router.push(`/profile/${user.id}`)}
    >
      <img
        src={
          user.image_path
            ? `http://localhost:8000/${user.image_path}` // ✅ serve uploaded image
            : "/default-avatar.png"
        }
        alt={user.username}
        className="profile_img w-full h-full object-cover"
      />
    </div>
  );
}