"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setError(error.message);
  };

  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
      {/* Fondo animado */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: [
            "linear-gradient(135deg, #1e293b, #0f172a, #1e40af)",
            "linear-gradient(135deg, #1e293b, #0f172a, #0369a1)",
            "linear-gradient(135deg, #1e293b, #0f172a, #1d4ed8)",
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Círculos decorativos */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-3xl"
        animate={{ x: [0, 100, -100, 0], y: [0, -50, 50, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-cyan-500/20 blur-3xl"
        animate={{ x: [50, -50, 100, -100], y: [0, 100, -100, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      {/* Card de login */}
      <motion.div
        className="w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-xl p-8 shadow-xl border border-white/20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            className="bg-white/20 text-white placeholder:text-gray-300"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            className="bg-white/20 text-white placeholder:text-gray-300"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}
          <Button
            type="submit"
            className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Log In
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
