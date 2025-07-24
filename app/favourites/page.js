"use client";
import { useState } from "react";
import Navbar from "../../app/src/components/NavBar";
import Sidebar from "../../app/src/components/SideBar";
import BookData from "../../app/src/components/BookData";
import Footer from "../src/components/Footer";

export default function FavouritesPage() {
  const [selectedBookId, setSelectedBookId] = useState(null);

  return (
    <div className="scroll-smooth flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar
          filter="favourites"
          onBookClick={(id) => setSelectedBookId(id)}
        />

        <main className="flex-1 p-6 space-y-6">
          <BookData bookId={selectedBookId} filter="favourites" />
        </main>
      </div>
      <Footer />
    </div>
  );
}
