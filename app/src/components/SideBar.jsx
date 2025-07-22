"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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

	const toggle = (section) =>
		setOpen((prev) => ({ ...prev, [section]: !prev[section] }));

	const renderList = (items) =>
		items.length ? (
			<ul className="space-y-1 ">
				{items.map((book) => (
					<li key={book.id} className="hover:-translate-y-[1px] transition-transform duration-200">
						<button
							onClick={() => router.push(`/books/${book.id}`)}
							className="text-left w-full block text-gray-700 hover:text-gray-900"
						>
							{book.title}
						</button>
					</li>
				))}
			</ul>
		) : (
			<p className="text-sm italic text-gray-500">No Books Favourited</p>
		);

	// Pre-filtered subsets
	const favourites = books.filter((b) => b.isFavourite);
	const borrowed = books.filter((b) => b.borrowedBy);

	return (
		<aside className="w-64 shadow-md rounded-r-xs rounded-b-lg h-auto transition duration-200 bg-white border-r border-b-1  p-4 flex-shrink-0">
			{/* All Books */}
			<section className="mb-6">
				<h2
					onClick={() => toggle("all")}
					className="flex justify-between items-center text-lg font-semibold mb-2 cursor-pointer select-none  hover:-translate-y-[1px] transition-transform duration-200"
				>
					All Books
					<span>{open.all ? "▾" : "▸"}</span>
				</h2>
				{open.all && renderList(books)}
			</section>

			{/* Favourites */}
			<section className="mb-6">
				<h2
					onClick={() => toggle("favourites")}
					className="flex justify-between items-center hover:-translate-y-[1px] transition-transform duration-200 text-lg font-semibold mb-2 cursor-pointer select-none"
				>
					Favourites
					<span>{open.favourites ? "▾" : "▸"}</span>
				</h2>
				{open.favourites && renderList(favourites)}
			</section>

			{/* Borrowed */}
			<section>
				<h2
					onClick={() => toggle("borrowed")}
					className="flex justify-between items-center hover:-translate-y-[1px] transition-transform duration-200 text-lg font-semibold mb-2 cursor-pointer select-none"
				>
					Borrowed
					<span>{open.borrowed ? "▾" : "▸"}</span>
				</h2>
				{open.borrowed && renderList(borrowed)}
			</section>
		</aside>
	);
}
