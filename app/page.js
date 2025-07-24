"use client";
import { useState, useEffect } from "react";
import Navbar from "./src/components/NavBar";
import Sidebar from "./src/components/SideBar";
import Dashboard from "./src/components/Dashboard";
import BookData from "./src/components/BookData";
import Footer from "./src/components/Footer";
import { API } from "./src/api"; // assuming your API file is here

export default function Home() {
	const [selectedBookId, setSelectedBookId] = useState(null);
	const [books, setBooks] = useState([]);

	useEffect(() => {
		async function loadBooks() {
			try {
				const res = await fetch(API.local.books);
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				const data = await res.json();
				setBooks(data);
			} catch (err) {
				console.error("Failed to fetch books:", err);
			}
		}

		loadBooks();
	}, []);

	return (
		<div className="scroll-smooth flex flex-col min-h-screen">
			<Navbar />
			<div className="flex flex-1">
				<Sidebar books={books} onBookClick={(id) => setSelectedBookId(id)} />
				<main className="flex-1 p-6 space-y-6">
					<BookData bookId={selectedBookId} books={books} />
					<Dashboard />
				</main>
			</div>
			<Footer />
		</div>
	);
}
