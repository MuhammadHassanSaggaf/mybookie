"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { BookOpenIcon } from "@heroicons/react/24/outline";

export default function Sidebar() {
  const [books, setBooks] = useState([]);
  const router = useRouter();

  const [open, setOpen] = useState({
    all: false,
    favourites: false,
    borrowed: false,
  });

  useEffect(() => {
    async function loadBooks() {
      try {
        const res = await fetch("http://localhost:3001/books");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setBooks(await res.json());
      } catch (err) {
        console.error("Failed to fetch books:", err);
      }
    }
    loadBooks();
  }, []);

  const toggle = section =>
    setOpen(prev => ({ ...prev, [section]: !prev[section] }));

  const renderList = items =>
    items.length ? (
      <ul className="space-y-1">
        {items.map(book => (
          <li
            key={book.id}
            className="hover:-translate-y-[1px] transition-transform duration-200"
          >
            <button
              onClick={() => router.push(`/books/${book.id}`)}
              className="text-inherit hover:text-white/80 w-full text-left"
            >
              {book.title}
            </button>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-sm italic text-white/50">No Books Found</p>
    );

  const favourites = books.filter(b => b.isFavourite);
  const borrowed = books.filter(b => b.borrowedBy);

  return (
    <aside className="w-64 bg-[#0f172a] text-white p-6 rounded-r-lg shadow-lg border-r border-b border-white/10 flex flex-col">
      {/* All Books */}
      <section className="mb-6 border-b border-white/10 pb-4">
        <h2
          onClick={() => toggle("all")}
          className="flex justify-between items-center text-base font-semibold tracking-wide text-white/90 mb-2 cursor-pointer select-none hover:text-white transition-colors duration-200"
        >
          All Books
          <ChevronRightIcon
            className={`h-4 w-4 transition-transform duration-200 ${
              open.all ? "rotate-90" : ""
            }`}
          />
        </h2>
        {open.all && renderList(books)}
      </section>

      {/* Favourites */}
      <section className="mb-6 border-b border-white/10 pb-4">
        <h2
          onClick={() => toggle("favourites")}
          className="flex justify-between items-center text-base font-semibold tracking-wide text-white/90 mb-2 cursor-pointer select-none hover:text-white transition-colors duration-200"
        >
          Favourites
          <ChevronRightIcon
            className={`h-4 w-4 transition-transform duration-200 ${
              open.favourites ? "rotate-90" : ""
            }`}
          />
        </h2>
        {open.favourites && renderList(favourites)}
      </section>

      {/* Borrowed */}
      <section className="border-b border-white/10 pb-4">
        <h2
          onClick={() => toggle("borrowed")}
          className="flex justify-between items-center text-base font-semibold tracking-wide text-white/90 mb-2 cursor-pointer select-none hover:text-white transition-colors duration-200"
        >
          Borrowed
          <ChevronRightIcon
            className={`h-4 w-4 transition-transform duration-200 ${
              open.borrowed ? "rotate-90" : ""
            }`}
          />
        </h2>
        {open.borrowed && renderList(borrowed)}
      </section>
    </aside>
  );
}
