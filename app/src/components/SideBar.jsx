"use client";

import { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

export default function Sidebar({ onBookClick, filter, books = [] }) {
	console.log("🧩 All books passed to Sidebar:", books);
	const [open, setOpen] = useState({
		all: false,
		favourites: false,
		borrowed: false,
	});

	const toggle = (section) =>
		setOpen((prev) => ({ ...prev, [section]: !prev[section] }));

	const renderList = (items) =>
		items.length ? (
			<ul className="space-y-1">
				{items.map((book) => (
					<li
						key={book.id}
						className="hover:-translate-y-[1px] transition-transform duration-200"
					>
						<button
							onClick={() => onBookClick?.(book.id)}
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

const favourites = books.filter((b) => String(b.isFavourite) === "true");
const borrowed = books.filter((b) => b.borrowedBy?.trim());


	return (
		<aside className="bg-[#0f172a] w-50 text-white p-6 rounded-r-lg shadow-lg border-r border-b border-white/10 flex flex-col">
			{(!filter || filter === "all") && (
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
			)}

			{(!filter || filter === "favourites") && (
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
			)}

			{(!filter || filter === "borrowed") && (
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
			)}
		</aside>
	);
}
