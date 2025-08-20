"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Comprobar sesión actual al cargar
    const check = async () => {
      const { data } = await supabase.auth.getUser();
      setIsLoggedIn(!!data.user);
    };
    check();

    // Escuchar cambios de auth (login/logout)
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

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

        {/* Derecha: enlaces según sesión */}
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Link href="/login" className="underline">
                Login
              </Link>
              <Link href="/register" className="underline">
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="rounded-xl border px-3 py-1"
              aria-label="Cerrar sesión"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
