"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const registered = search.get("registered");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [okMsg, setOkMsg] = useState<string | null>(registered ? "Registro correcto. Ahora inicia sesión." : null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setOkMsg(null);

    if (!email || !password) return setErrorMsg("Escribe tu email y contraseña.");

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) return setErrorMsg(error.message);

    // Éxito: vamos a la Home (puedes cambiar a otra ruta si quieres)
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-6 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Iniciar sesión</h1>

        <label className="block">
          <span className="text-sm">Email</span>
          <input
            type="email"
            className="mt-1 w-full border rounded-lg p-2"
            placeholder="tucorreo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </label>

        <label className="block">
          <span className="text-sm">Contraseña</span>
          <input
            type="password"
            className="mt-1 w-full border rounded-lg p-2"
            placeholder="Tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>

        {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}
        {okMsg && <p className="text-green-700 text-sm">{okMsg}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl p-2 border bg-black text-white disabled:opacity-60"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <p className="text-center text-sm">
          ¿No tienes cuenta?{" "}
          <Link className="underline" href="/register">
            Regístrate
          </Link>
        </p>
      </form>
    </div>
  );
}
