"use client";

import { useState, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<"en-US" | "ne-NP">("en-US"); // 🌐 Language toggle
  const cardRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit],
    content: "",
  });

  // 🎯 3D Mouse Tilt Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -(y - rect.height / 2) / 25;
    const rotateY = (x - rect.width / 2) / 25;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const resetTilt = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
    }
  };

  // 🎙️ Voice Input for Title
  const handleVoiceTitle = () => {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = language;
    recognition.start();
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setTitle(transcript);
    };
  };

  // 🎙️ Voice Input for Content
  const handleVoiceContent = () => {
    if (!editor) return;
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = language;
    recognition.start();
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      editor.commands.insertContent(transcript);
    };
  };

  // 🚫 Backend publishing removed
  const handleSubmit = () => {
    if (!editor) return;
    setLoading(true);
    setTimeout(() => {
      alert("🚀 Post Published! (frontend-only)");
      setTitle("");
      editor.commands.clearContent();
      setLoading(false);
    }, 800);
  };

  if (!editor) return null;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-[600px] h-[600px] bg-purple-600/20 blur-[150px] rounded-full animate-pulse"></div>

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        className="relative w-full max-w-4xl p-10 rounded-3xl 
        bg-gradient-to-br from-zinc-900 to-black
        border border-purple-500/30
        shadow-[0_0_60px_rgba(139,92,246,0.4)]
        transition-transform duration-150 ease-out
        backdrop-blur-xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Scan Line */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/10 to-transparent animate-[scan_4s_linear_infinite] pointer-events-none rounded-3xl"></div>

        {/* Title */}
        <h1
          className="text-3xl font-bold mb-6 tracking-widest
          bg-gradient-to-r from-emerald-400 to-purple-500
          bg-clip-text text-transparent"
        >
          NEURAL WRITE INTERFACE
        </h1>

        {/* Language Toggle */}
        <div className="flex items-center gap-4 mb-6">
          <label className="text-white">🌐 Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as "en-US" | "ne-NP")}
            className="bg-zinc-800 text-white px-3 py-1 rounded-lg border border-purple-500/40"
          >
            <option value="en-US">English</option>
            <option value="ne-NP">Nepali</option>
          </select>
        </div>

        {/* Title Input + Voice Button */}
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 bg-transparent border-b-2 border-purple-500/40
            focus:border-emerald-400 outline-none text-xl text-white
            placeholder:text-zinc-500 pb-2 transition-all"
          />
          <button
            onClick={handleVoiceTitle}
            className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            🎙️ Speak Title
          </button>
        </div>

        {/* Editor + Voice Button */}
        <div className="flex flex-col gap-4">
          <EditorContent
            editor={editor}
            className="w-full h-full min-h-[400px] bg-zinc-950/70 rounded-xl p-6
            border border-purple-500/30 text-white overflow-y-auto"
          />
          <button
            onClick={handleVoiceContent}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            🎙️ Speak Content
          </button>
        </div>

        {/* Publish Button */}
        <button
          onClick={handleSubmit}
          className="mt-8 px-6 py-3 rounded-xl
          bg-gradient-to-r from-purple-600 to-indigo-600
          hover:scale-105 transition-all duration-300
          shadow-[0_0_25px_rgba(139,92,246,0.6)]
          text-white font-semibold"
        >
          {loading ? "Transmitting..." : "Publish"}
        </button>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <span className="absolute w-2 h-2 bg-emerald-400 rounded-full animate-bounce top-10 left-10"></span>
          <span className="absolute w-2 h-2 bg-purple-500 rounded-full animate-bounce bottom-10 right-20"></span>
          <span className="absolute w-2 h-2 bg-indigo-400 rounded-full animate-bounce top-1/2 left-1/3"></span>
        </div>
      </div>
    </div>
  );
}