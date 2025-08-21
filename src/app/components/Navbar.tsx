"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import useUserProfile from "@/hooks/useUserProfile"; // 👈 importa el hook

export default function Navbar() {
  const router = useRouter();
  const { user, profile, loading } = useUserProfile(); // 👈 usamos el hook

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/"); // volvemos a Home
  };

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Izquierda: logo / nombre */}
        <Link href="/" className="font-bold text-lg">
          BookBox
        </Link>

        {/* Derecha */}
        <div className="flex items-center gap-4">
          {loading ? (
            <span className="text-gray-500 text-sm">Cargando...</span>
          ) : !user ? (
            // 🔹 Si NO hay usuario
            <>
              <Link href="/login" className="underline">
                Login
              </Link>
              <Link href="/register" className="underline">
                Register
              </Link>
            </>
          ) : (
            // 🔹 Si SÍ hay usuario logueado
            <div className="flex items-center gap-3">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm">
                  {profile?.username?.[0]?.toUpperCase() || "U"}
                </div>
              )}
              <span className="text-sm">{profile?.username || user.email}</span>
              <button
                onClick={handleLogout}
                className="rounded-xl border px-3 py-1"
                aria-label="Cerrar sesión"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
