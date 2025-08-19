import { supabase } from "@/lib/supabaseClient"

export default async function TestPage() {
  const { data, error } = await supabase.from("profiles").select("*")

  console.log("Supabase response:", { data, error })

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Supabase Connection Test</h1>
      {error && <pre>{error.message}</pre>}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
