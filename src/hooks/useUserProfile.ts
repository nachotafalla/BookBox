"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Profile = {
  id: string;
  username?: string;
  avatar_url?: string;
  created_at?: string;
};

export default function useUserProfile() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error && error.code === "PGRST116") {
          // No existe perfil → crearlo automáticamente
          const { data: newProfile } = await supabase
            .from("profiles")
            .insert([{ id: user.id }])
            .select()
            .single();
          setProfile(newProfile);
        } else {
          setProfile(data);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    };

    fetchProfile();

    const { data: subscription } = supabase.auth.onAuthStateChange(() => {
      fetchProfile();
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  return { user, profile, loading };
}
