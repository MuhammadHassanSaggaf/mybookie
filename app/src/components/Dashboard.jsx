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
		<div className="block mt-2 shadow-[0_4px_30px_rgba(0,0,0,0.8)] backdrop-blur-sm hover:scale-105 bg-gradient-to-br from-black via-gray-900 to-black text-white w-64 min-h-[442px] transition-all rounded-[15px] hover:shadow-[0_12px_24px_rgba(255,255,255,0.08)] duration-600 ease-in-out">
			<div id="img-available " className="  flex items-center justify-center ">
				{!imageError ? (
					<img
						src={book.coverUrl}
						alt={`${book.title} cover`}
						onError={() => setImageError(true)}
						className="object-contain h-[278px] rounded-t-[15px]"
					/>
				) : (
					<div className="flex items-center justify-center w-24 bg-gray-100">
						<BookOpenIcon
							aria-label="Book cover not available"
							className="h-8 w-8 text-gray-400"
						/>
					</div>
				)}
			</div>

			<div className="p-4">
				<h3 className="text-lg font-semibold">{book.title}</h3>
				<p className="text-sm  mb-2">by {book.author}</p>

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
						className="bg-gradient-to-br from-black via-gray-900 to-black text-white rounded-[10px] inline-flex items-center px-4 py-2  transition-all duration-300 ease-in-out shadow-[0_8px_20px_rgba(255,255,255,0.05)] hover:scale-105 hover:shadow-[0_12px_24px_rgba(255,255,255,0.08)] focus:outline-none focus:ring-2 focus:ring-white/30"
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
