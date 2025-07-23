// app/favourites/page.js
"use client";
import { useState } from "react";
import Navbar from "../../app/src/components/NavBar";
import Sidebar from "../../app/src/components/SideBar";
import BookData from "../../app/src/components/BookData";

export default function FavouritesPage() {
	const [selectedBookId, setSelectedBookId] = useState(null);

	return (
		<>
			<Navbar />
			<div className="flex">
				<Sidebar
					filter="favourites"
					onBookClick={(id) => setSelectedBookId(id)}
				/>
				<main className="flex-1 p-6">
					<BookData bookId={selectedBookId} />
				</main>
			</div>
		</>
	);
}
