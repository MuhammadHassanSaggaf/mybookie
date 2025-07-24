"use client";
import React, { useEffect, useState } from "react";
import { API } from "../api/index";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

export default function BookData({ bookId: propBookId, filter = "all" }) {
	const [book, setBook] = useState(null);
	const [imageError, setImageError] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchBook() {
			setLoading(true);
			setError(null);
			try {
				let id = propBookId;
				if (!id) {
					const listRes = await fetch(API.local.books);
					if (!listRes.ok) throw new Error(`HTTP ${listRes.status}`);
					let list = await listRes.json();
					if (filter === "favourites") list = list.filter((b) => b.isFavourite);
					else if (filter === "borrowed")
						list = list.filter((b) => b.borrowedBy);
					if (!list.length)
						throw new Error("No books available for this filter.");
					id = list[Math.floor(Math.random() * list.length)].id;
				}
				const res = await fetch(API.local.singleBook(id));
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				setBook(await res.json());
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}
		fetchBook();
	}, [propBookId, filter]);

	const toggleFavourite = async () => {
		if (!book) return;
		try {
			const updated = { isFavourite: !book.isFavourite };
			const res = await fetch(API.local.singleBook(book.id), {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updated),
			});
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			setBook((prev) => ({ ...prev, isFavourite: !prev.isFavourite }));
		} catch (err) {
			console.error("Failed to update favourite:", err);
		}
	};

	if (loading) return <p className="text-center text-white">Loading...</p>;
	if (error) return <p className="text-center text-red-500">Error: {error}</p>;
	if (!book) return <p className="text-center text-white">No book found.</p>;

	const {
		title,
		author,
		isbn,
		description,
		borrowedBy,
		dueDate,
		isFavourite,
		coverUrl,
	} = book;

	return (
		<div className="flex flex-wrap w-80 justify-evenly items-center gap-auto mx-auto mt-2 shadow-[0_4px_30px_rgba(0,0,0,0.8)] backdrop-blur-sm hover:scale-105 bg-gradient-to-br from-black via-gray-900 to-black text-white min-h-[442px] transition-all rounded-[15px] hover:shadow-[0_12px_24px_rgba(255,255,255,0.08)] duration-600 ease-in-out">
			<div className="flex items-center justify-center">
				{!imageError && coverUrl ? (
					<img
						src={coverUrl}
						alt={`${title} cover`}
						onError={() => setImageError(true)}
						className="object-contain h-[278px] rounded-t-[15px]"
					/>
				) : (
					<div className="flex items-center justify-center w-full h-[278px] bg-gray-800 rounded-t-[15px]">
						<BookOpenIcon className="h-12 w-12 text-gray-500" />
					</div>
				)}
			</div>

			<div className="p-4 space-y-2">
				<div className="flex justify-between items-center">
					<h3 className="text-lg font-semibold">{title}</h3>
					<button
						onClick={toggleFavourite}
						className="transition-transform hover:scale-110"
					>
						{isFavourite ? (
							<HeartSolid className="h-6 w-6 text-red-500" />
						) : (
							<HeartOutline className="h-6 w-6 text-gray-500" />
						)}
					</button>
				</div>
				<p className="text-sm">by {author}</p>

				<ul className="text-sm space-y-1">
					<li>
						<span className="font-medium">ISBN:</span> {isbn}
					</li>
					<li>
						<span className="font-medium">Description:</span> {description}
					</li>
					<li>
						<span className="font-medium">Borrowed By:</span>{" "}
						{borrowedBy || "N/A"}
					</li>
					<li>
						<span className="font-medium">Due Date:</span> {dueDate || "N/A"}
					</li>
				</ul>
			</div>
		</div>
	);
}

