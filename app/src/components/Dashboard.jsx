// src/components/Dashboard.jsx
"use client";
import React, { useState } from "react";
import {
	BookOpenIcon,
	ChevronUpIcon,
	EyeIcon,
	HeartIcon,
} from "@heroicons/react/24/outline";

// Import static data
import booksData from "../data/db.json";

// Component for displaying individual book information
const BookCard = ({ book, onShowMore, isExpanded }) => {
	const [imageError, setImageError] = useState(false);

  return (
		// <div className="flex flex-wrap w-80 justify-center items-center gap-5 mx-auto">
		<div className="block mt-2 bg-red-900 w-64 rounded-[15px] shadow-md transition-shadow transition-transform duration-600 ease-in-out">
			<div
				id="img-available "
				className="  flex items-center justify-center "
			>
				{!imageError ? (
					<img
						src={book.coverUrl}
						alt={`${book.title} cover`}
						onError={() => setImageError(true)}
					/>
				) : (
					<div className="flex items-center justify-center h-32 w-24 bg-gray-100">
						<BookOpenIcon
							aria-label="Book cover not available"
							className="h-8 w-8 text-gray-400"
						/>
					</div>
				)}
			</div>

			<div className="p-4">
				<h3 className="text-lg font-semibold">{book.title}</h3>
				<p className="text-sm text-gray-600 mb-2">by {book.author}</p>

				<p className="mb-2">
					{isExpanded ? book.fullDescription : book.description}
				</p>
				<button
					onClick={() => onShowMore(book.id)}
					className="border-none  rounded-[10px] text-sm cursor-pointer font-medium font-inter transition-transform duration-500 ease-in-out flex hover:scale-105"
				>
					{isExpanded ? (
						<>
							<EyeIcon className="h-5 w-5 mr-1" />
							Show More
						</>
					) : (
						<>
							<ChevronUpIcon className="h-5 w-5 mr-1" />
							Show Less
						</>
					)}
				</button>

				<div className="flex items-center justify-between">
					<span className="text-xs uppercase text-gray-500">
						{book.category}
					</span>
					<button aria-label="Add to favorites" className="hover:text-red-500">
						<HeartIcon className="h-5 w-5" />
					</button>
				</div>
			</div>
		</div>
		// </div>
	);
};

// Main dashboard component managing views and state
const Dashboard = () => {
	const [books] = useState(booksData.books);
	const [expandedBooks, setExpandedBooks] = useState(new Set());
	const [showAllBooks, setShowAllBooks] = useState(false);

	const handleShowAllBooks = () => setShowAllBooks(true);

	const handleShowMore = (bookId) => {
		setExpandedBooks((prev) => {
			const newSet = new Set(prev);
			newSet.has(bookId) ? newSet.delete(bookId) : newSet.add(bookId);
			return newSet;
		});
	};

	const displayBooks = showAllBooks ? books : books.slice(0, 3);

	return (
		<main className="p-6">
			<div className="flex flex-wrap w-auto justify-center items-center gap-5 mx-auto">
				{displayBooks.map((book) => (
					<BookCard
						key={book.id}
						book={book}
						onShowMore={handleShowMore}
						isExpanded={expandedBooks.has(book.id)}
					/>
				))}
			</div>

			{!showAllBooks && (
				<div className="mt-6 text-center">
					<button
						onClick={handleShowAllBooks}
						className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
					>
						<BookOpenIcon className="h-5 w-5 mr-2" />
						Show All Books ({books.length} total)
					</button>
				</div>
			)}
		</main>
	);
};

export default Dashboard;
