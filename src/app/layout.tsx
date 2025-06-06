// app/layout.tsx

import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BookBox',
  description: 'Track, rate and discover books like never before.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 font-sans">
        <header className="border-b px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">📚 BookBox</h1>
          <nav className="space-x-4">
            <a href="/" className="text-sm hover:underline">Home</a>
            <a href="/login" className="text-sm hover:underline">Login</a>
            <a href="/register" className="text-sm hover:underline">Register</a>
          </nav>
        </header>
        <main className="p-6 max-w-4xl mx-auto">{children}</main>
      </body>
    </html>
  )
}
