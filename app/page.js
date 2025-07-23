"use client";
import { useState } from "react";
import Navbar from "./src/components/NavBar";
import Sidebar from "./src/components/SideBar";
import Dashboard from "./src/components/Dashboard";
import BookData from "./src/components/BookData";

export default function Home() {
	const [selectedBookId, setSelectedBookId] = useState(null);

	return (
		<div className="scroll-smooth">
			<Navbar />
			<div className="flex">
				<Sidebar onBookClick={(id) => setSelectedBookId(id)} />
				<main className="flex-1 p-6 space-y-6">
					<Dashboard />
					<BookData bookId={selectedBookId} />
				</main>
			</div>
		</div>
	);
}
