// app/borrowed/page.js
"use client";
import { useState } from "react";

import Navbar from "../../app/src/components/NavBar";
import Sidebar from "../../app/src/components/SideBar";
import BookData from "../../app/src/components/BookData";

export default function BorrowedPage() {
  const [selectedBookId, setSelectedBookId] = useState(null);

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar
          filter="borrowed"
          onBookClick={(id) => setSelectedBookId(id)}
        />
        <main className="flex-1 p-6">
          <BookData bookId={selectedBookId} />
        </main>
      </div>
    </>
  );
}