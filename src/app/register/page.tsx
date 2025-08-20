"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [okMsg, setOkMsg] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setOkMsg(null);

    if (!email) return setErrorMsg("Por favor, escribe tu email.");
    if (password.length < 6) return setErrorMsg("La contraseña debe tener al menos 6 caracteres.");
    if (password !== confirm) return setErrorMsg("Las contraseñas no coinciden.");

    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });

    setLoading(false);
    if (error) {
      setErrorMsg(error.message);
      return;
    }

    // Si confirmación de email está activada, te dirá que revises el correo.
    setOkMsg("Registro correcto. Si se requiere confirmación, revisa tu email.");
    // Puedes enviar al login directamente:
    setTimeout(() => router.push("/login?registered=1"), 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-6 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Crear cuenta</h1>

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
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </label>

        <label className="block">
          <span className="text-sm">Repite la contraseña</span>
          <input
            type="password"
            className="mt-1 w-full border rounded-lg p-2"
            placeholder="Vuelve a escribir tu contraseña"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            autoComplete="new-password"
          />
        </label>

        {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}
        {okMsg && <p className="text-green-700 text-sm">{okMsg}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl p-2 border bg-black text-white disabled:opacity-60"
        >
          {loading ? "Creando cuenta..." : "Registrarme"}
        </button>

        <p className="text-center text-sm">
          ¿Ya tienes cuenta?{" "}
          <Link className="underline" href="/login">
            Inicia sesión
          </Link>
        </p>
      </form>
    </div>
  );
}
