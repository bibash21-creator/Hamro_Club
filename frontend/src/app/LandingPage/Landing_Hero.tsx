"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Float, Environment } from "@react-three/drei";
import { Suspense } from "react";

// Girl model (scaled larger)
function GirlModel() {
  const { scene } = useGLTF("/models/girl-reading.glb");
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <primitive object={scene} scale={3.5} position={[0, -2, 0]} />
    </Float>
  );
}

export default function LandingHero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-white to-emerald-50 dark:from-gray-900 dark:via-black dark:to-gray-800">
      {/* Dense blogging-related background patterns */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Notebook paper lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[length:100%_40px] opacity-30 dark:opacity-20"></div>

        {/* Typography scatter */}
        <div className="absolute inset-0 flex flex-wrap text-gray-300 dark:text-gray-600 opacity-20 text-6xl font-bold tracking-widest">
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((char, i) => (
            <span key={i} className="m-4">{char}</span>
          ))}
        </div>

        {/* Ink splash gradients */}
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-pink-200 to-purple-300 rounded-full blur-3xl opacity-40 top-[-10%] left-[-10%] animate-pulse dark:from-purple-900 dark:to-indigo-900"></div>
        <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-indigo-200 to-blue-300 rounded-full blur-3xl opacity-40 bottom-[-10%] right-[-10%] animate-pulse dark:from-blue-900 dark:to-gray-900"></div>

        {/* Blogging icon motifs */}
        <div className="absolute inset-0 grid grid-cols-6 gap-8 text-gray-200 dark:text-gray-700 opacity-20 text-2xl">
          {Array.from({ length: 36 }).map((_, i) => (
            <span key={i}>{["🖋️","📚","💡","✍️"][i % 4]}</span>
          ))}
        </div>

        {/* Geometric notebook grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[length:40px_40px] opacity-20 dark:opacity-10"></div>

        {/* Hexagonal honeycomb pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-10 dark:opacity-20">
          <defs>
            <pattern id="hex" width="40" height="35" patternUnits="userSpaceOnUse">
              <polygon points="20,0 40,10 40,25 20,35 0,25 0,10" stroke="currentColor" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex)" className="text-gray-300 dark:text-gray-700" />
        </svg>

        {/* Overlapping circles */}
        <div className="absolute w-[300px] h-[300px] rounded-full border-4 border-gray-300 dark:border-gray-700 opacity-20 top-[20%] left-[10%]"></div>
        <div className="absolute w-[300px] h-[300px] rounded-full border-4 border-gray-300 dark:border-gray-700 opacity-20 top-[25%] left-[15%]"></div>
      </div>

      {/* Fullscreen 3D Canvas */}
      <Canvas camera={{ position: [0, 2, 12], fov: 60 }} className="absolute inset-0">
        <Suspense fallback={null}>
          <ambientLight intensity={1.3} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <Environment preset="sunset" />
          <GirlModel />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} />
        </Suspense>
      </Canvas>

      {/* Bold, broad text overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <h1 className="absolute left-[8%] top-[15%] text-8xl font-black tracking-tight leading-tight text-black dark:text-white drop-shadow-2xl animate-drop rotate-[-12deg]">
          Write
        </h1>
        <h1 className="absolute left-[20%] top-[35%] text-8xl font-black tracking-tight leading-tight text-black dark:text-white drop-shadow-2xl animate-drop delay-200 rotate-[10deg]">
          Your
        </h1>
        <h1 className="absolute left-[32%] top-[55%] text-8xl font-black tracking-tight leading-tight text-black dark:text-white drop-shadow-2xl animate-drop delay-400 rotate-[-8deg]">
          Story
        </h1>

        <h2 className="absolute bottom-[20%] left-[12%] text-4xl font-bold tracking-wide text-black dark:text-white animate-wave drop-shadow-md">
          Share Knowledge. Inspire Others.
        </h2>
        <p className="absolute bottom-[10%] left-[18%] max-w-2xl text-xl font-medium text-black dark:text-gray-300 animate-wave delay-400 leading-relaxed drop-shadow-sm">
          Launch your ideas, publish posts, and grow your own blogging universe with a platform built for creators.
        </p>
      </div>
    </section>
  );
}