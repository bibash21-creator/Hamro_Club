"use client";
import { useState } from "react";
import NewsFeed from "@/app/feed/components/NewsFeed";

interface Story {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export default function NewsFeedPage() {
  const [stories] = useState<Story[]>([
    { id: 1, title: "Welcome!", content: "This is a sample feed without backend.", created_at: new Date().toISOString() },
    { id: 2, title: "Demo Post", content: "Add your own posts here.", created_at: new Date().toISOString() },
  ]);

  return <NewsFeed stories={stories} />;
}