"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      router.push("/login"); // después de registrarse, lo mando al login
    }
  };

  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
      {/* Fondo animado con dirección diferente */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: [
            "linear-gradient(225deg, #1e293b, #0f172a, #1e40af)",
            "linear-gradient(225deg, #1e293b, #0f172a, #0369a1)",
            "linear-gradient(225deg, #1e293b, #0f172a, #1d4ed8)",
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
        className="absolute w-[600px] h-[600px] rounded-full bg-indigo-600/20 blur-3xl"
        animate={{ x: [0, -100, 100, 0], y: [0, 50, -50, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-sky-500/20 blur-3xl"
        animate={{ x: [-50, 50, -100, 100], y: [0, -100, 100, 0] }}
        transition={{ duration: 22, repeat: Infinity }}
      />

      {/* Card de registro */}
      <motion.div
        className="w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-xl p-8 shadow-xl border border-white/20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Create Account
        </h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            className="bg-white/20 text-white placeholder:text-gray-300"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            className="bg-white/20 text-white placeholder:text-gray-300"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}
          <Button
            type="submit"
            disabled={loading}
            className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {loading ? "Creating account..." : "Register"}
          </Button>
        </form>

        <p className="text-sm text-white/80 text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-300 hover:underline">
            Log in
          </a>
        </p>
      </motion.div>
    </div>
  );
}
