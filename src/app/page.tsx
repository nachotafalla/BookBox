'use client';
import Image from "next/image";

// Sidebar
function Sidebar() {
  return (
    <aside className="w-60 min-h-screen bg-white border-r flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 px-6 py-8">
          <Image src="/bookbox-logo.svg" alt="BookBox logo" width={36} height={36} />
          <div>
            <span className="font-extrabold text-lg tracking-tight">BookBox</span>
            <span className="text-xs text-gray-500 block">Social Reading</span>
          </div>
        </div>
        <nav className="mt-8 px-6 flex flex-col gap-2 font-medium text-gray-700">
          <a href="#" className="py-2 px-3 rounded bg-gray-100">Browse Books</a>
          <a href="#" className="py-2 px-3 rounded hover:bg-gray-100">Search</a>
          <a href="#" className="py-2 px-3 rounded hover:bg-gray-100">Trending</a>
          <a href="#" className="py-2 px-3 rounded hover:bg-gray-100">My Profile</a>
        </nav>
      </div>
      <div className="p-6 border-t mt-4 flex items-center gap-3">
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <span role="img" aria-label="User">👤</span>
        </div>
        <div>
          <div className="font-semibold text-sm">Reader</div>
          <div className="text-xs text-gray-500">Book enthusiast</div>
        </div>
      </div>
    </aside>
  );
}

// Header
function Header() {
  return (
    <header className="bg-gradient-to-br from-blue-600 to-purple-500 rounded-2xl p-8 flex flex-col gap-[16px]">
      <div className="flex items-center gap-4">
        <span className="bg-white/20 rounded-full p-2">
          <Image src="icon.jpeg" alt="BookBox logo" width={32} height={32} />
        </span>
        <span className="text-3xl font-extrabold text-white">BookBox</span>
      </div>
      <p className="text-white text-lg">
        Discover, review, and share your favorite books with a community of passionate readers
      </p>
      <div className="flex gap-4 items-center">
        <span className="text-white/80 text-sm">📈 Trending Now</span>
        <span className="text-white/80 text-sm ml-2">| Join thousands of book lovers</span>
      </div>
    </header>
  );
}

// Book Card
function BookCard({ img, title }: { img: string; title: string }) {
  return (
    <div className="w-[150px] flex flex-col shrink-0">
      <div className="h-[200px] w-full bg-gray-100 rounded-lg overflow-hidden relative">
        {img ? (
          <Image src={img} alt={title} fill style={{ objectFit: "cover" }} className="rounded-lg"/>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
        )}
      </div>
      <div className="mt-2 text-sm font-semibold">{title}</div>
    </div>
  );
}

// Books List
function BookList() {
  // Replace this with real data
  const books = [
    { title: "Atomic Habits", img: "/book1.jpg" },
    { title: "Dune", img: "" },
    { title: "Educated", img: "/book3.jpg" },
    { title: "Project Hail", img: "/book4.jpg" },
    // More...
  ];
  return (
    <section>
      <h2 className="font-bold text-xl mb-4">Discover Books</h2>
      <div className="flex gap-6 overflow-x-auto pb-3">
        {books.map((b, i) => <BookCard key={i} {...b} />)}
      </div>
      <p className="text-xs text-gray-400 mt-2">{books.length} books found</p>
    </section>
  );
}

// SEARCH BAR
function SearchBar() {
  return (
    <form className="flex items-center gap-4 w-full mt-6">
      <input
        type="text"
        placeholder="Search books or authors..."
        className="flex-1 rounded px-4 py-2 bg-gray-100"
      />
      <select className="rounded px-4 py-2 bg-gray-100">
        <option>All Genres</option>
        {/* Add actual genre options */}
      </select>
      <select className="rounded px-4 py-2 bg-gray-100">
        <option>Title</option>
        <option>Author</option>
      </select>
    </form>
  );
}

// MAIN LAYOUT
export default function Home() {
  return (
    <div className="flex min-h-screen font-sans bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col px-12 py-10 gap-6">
        <Header />
        <SearchBar />
        <BookList />
      </div>
    </div>
  );
}
