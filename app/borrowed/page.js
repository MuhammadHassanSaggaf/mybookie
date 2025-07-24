"use client";
import { useEffect, useState } from "react";
import Navbar from "../../app/src/components/NavBar";
import Sidebar from "../../app/src/components/SideBar";
import BookData from "../../app/src/components/BookData";
import Footer from "../src/components/Footer";
import { fetchBooks } from "../../services/bookService";

export default function BorrowedPage() {
	const [selectedBookId, setSelectedBookId] = useState(null);
	const [books, setBooks] = useState([]);

	useEffect(() => {
		async function loadBooks() {
			const data = await fetchBooks();
			setBooks(data);
		}
		loadBooks();
	}, []);

	return (
		<div className="scroll-smooth flex flex-col min-h-screen">
			<Navbar />
			<div className="flex flex-1">
				<Sidebar
					filter="borrowed"
					books={books}
					onBookClick={(id) => setSelectedBookId(id)}
				/>
				<main className="flex-1 p-6 space-y-6">
					<BookData bookId={selectedBookId} filter="borrowed" />
				</main>
			</div>
			<Footer />
		</div>
	);
}
