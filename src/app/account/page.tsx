"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient"; // <- ajusta si en tu proyecto es "@/lib/..." o ruta relativa

export default function AccountPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/login");
        return;
      }
      // <-- solución al error de typescript:
      setEmail(data.user?.email ?? null);
      setLoading(false);
    };
    check();
  }, [router]);

  if (loading) return <p className="p-4">Cargando…</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Mi cuenta</h1>
      <p className="mt-2">
        Estás dentro como: <strong>{email}</strong>
      </p>
    </div>
  );
}
