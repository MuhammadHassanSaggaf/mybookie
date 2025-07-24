// "use client";
// import React, { useState, useEffect } from "react";
// import {
// 	BookOpenIcon,
// 	ChevronUpIcon,
// 	EyeIcon,
// } from "@heroicons/react/24/outline";

// // Import static data
// import booksData from "../data/db.json";
// import { deleteBook } from "@/services/bookService";

// // Component for displaying individual book information


// import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
// import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
// import { API } from "../api/index";

// // Component for displaying individual book information
// const BookCard = ({ book, onShowMore, isExpanded, onToggleFavourite , onDeleteBook }) => {

// 	const [imageError, setImageError] = useState(false);

// 	return (
// 		<div className="mt-4 mr-4 ml-4 flex flex-col justify-evenly flex-wrap shadow-[0_4px_30px_rgba(0,0,0,0.8)] backdrop-blur-sm hover:scale-105 bg-gradient-to-br from-black via-gray-900 to-black text-white w-64 min-h-[442px] transition-all rounded-[15px] hover:shadow-[0_12px_24px_rgba(255,255,255,0.08)] duration-600 ease-in-out">
// 			<div className="flex items-center justify-center">
// 				{!imageError ? (
// 					<img
// 						src={book.coverUrl}
// 						alt={`${book.title} cover`}
// 						onError={() => setImageError(true)}
// 						className="object-contain h-[278px] rounded-t-[15px]"
// 					/>
// 				) : (
// 					<div className="flex items-center justify-center w-full h-[278px] bg-gray-800 rounded-t-[15px]">
// 						<BookOpenIcon className="h-12 w-12 text-gray-500" />
// 					</div>
// 				)}
// 			</div>

// 			<div className="p-4">
// 				<h3 className="text-lg font-semibold">{book.title}</h3>
// 				<p className="text-sm mb-2">by {book.author}</p>

// 				{isExpanded && (
// 					<p className="mb-2">{book.fullDescription || book.description}</p>
// 				)}

// 				<button
// 					onClick={() => onShowMore(book.id)}
// 					className="border-none rounded-[10px] text-sm cursor-pointer font-medium font-inter transition-transform duration-500 ease-in-out flex hover:scale-105"
// 				>
// 					{isExpanded ? (
// 						<>
// 							<ChevronUpIcon className="h-5 w-5 mr-1" />
// 							Show Less
// 						</>
// 					) : (
// 						<>
// 							<EyeIcon className="h-5 w-5 mr-1" />
// 							Show More
// 						</>
// 					)}
// 				</button>


// 				<button
// 					onClick={() => onDeleteBook(book.id)}
// 					className="border-none text-red-500 rounded-[10px] text-sm cursor-pointer font-medium font-inter transition-transform duration-500 ease-in-out flex hover:scale-105"
// 				>
// 					🗑️ Delete Book 
// 				</button>

// 				<div className="flex items-center justify-between">

// 				<div className="flex items-center justify-between mt-4">

// 					<span className="text-xs uppercase text-gray-500">
// 						{book.category}
// 					</span>
// 					<button
// 						onClick={() => onToggleFavourite(book.id, book.isFavourite)}
// 						aria-label="Toggle favorite"
// 						className="transition-transform hover:scale-110"
// 					>
// 						{book.isFavourite ? (
// 							<HeartSolid className="h-5 w-5 text-red-500" />
// 						) : (
// 							<HeartOutline className="h-5 w-5 text-gray-500" />
// 						)}
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// // Main dashboard component managing views and state
// const Dashboard = () => {
// 	const [books, setBooks] = useState(booksData.books);
	

// 	const [expandedBooks, setExpandedBooks] = useState(new Set());
// 	const [showAllBooks, setShowAllBooks] = useState(false);

// 	// Load books from server
// 	useEffect(() => {
// 		fetch(API.local.books)
// 			.then((res) => res.json())
// 			.then(setBooks)
// 			.catch((err) => console.error("Error loading books:", err));
// 	}, []);

// 	const handleShowAllBooks = () => setShowAllBooks(true);

// 	const handleShowMore = (bookId) => {
// 		setExpandedBooks((prev) => {
// 			const newSet = new Set(prev);
// 			newSet.has(bookId) ? newSet.delete(bookId) : newSet.add(bookId);
// 			return newSet;
// 		});
// 	};


// 	const handleDelete = (bookId) => {
// 		const booksToShow = books.filter( (book) => book.id != bookId);
// 		setBooks(booksToShow);
// 		deleteBook(bookId);
// 	}

// 	const handleToggleFavourite = async (bookId, currentStatus) => {
// 		try {
// 			await fetch(API.local.singleBook(bookId), {
// 				method: "PATCH",
// 				headers: { "Content-Type": "application/json" },
// 				body: JSON.stringify({ isFavourite: !currentStatus }),
// 			});
// 			setBooks((prevBooks) =>
// 				prevBooks.map((b) =>
// 					b.id === bookId ? { ...b, isFavourite: !currentStatus } : b,
// 				),
// 			);
// 		} catch (err) {
// 			console.error("Failed to update favorite:", err);
// 		}
// 	};


// 	const displayBooks = showAllBooks ? books : books.slice(0, 3);

// 	return (
// 		<main className="p-6">
// 			<div className="flex flex-wrap justify-evenly items-center gap-6 mx-auto">
// 				{displayBooks.map((book) => (
// 					<BookCard
// 						key={book.id}
// 						book={book}
// 						onShowMore={handleShowMore}
// 						onDeleteBook={handleDelete}
// 						isExpanded={expandedBooks.has(book.id)}
// 						onToggleFavourite={handleToggleFavourite}
// 					/>
// 				))}
// 			</div>

// 			{!showAllBooks && (
// 				<div className="mt-6 text-center">
// 					<button
// 						onClick={handleShowAllBooks}
// 						className="bg-gradient-to-br from-black via-gray-900 to-black text-white rounded-[10px] inline-flex items-center px-4 py-2 transition-all duration-300 ease-in-out shadow-[0_8px_20px_rgba(255,255,255,0.05)] hover:scale-105 hover:shadow-[0_12px_24px_rgba(255,255,255,0.08)] focus:outline-none focus:ring-2 focus:ring-white/30"
// 					>
// 						<BookOpenIcon className="h-5 w-5 mr-2" />
// 						Show All Books ({books.length} total)
// 					</button>
// 				</div>
// 			)}
// 		</main>
// 	);
// };

// export default Dashboard;
"use client";
import React, { useState, useEffect } from "react";
import {
	BookOpenIcon,
	ChevronUpIcon,
	EyeIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

import booksData from "../data/db.json";
import { deleteBook } from "@/services/bookService";
import { API } from "../api/index";

// Book Card Component
const BookCard = ({
	book,
	onShowMore,
	isExpanded,
	onToggleFavourite,
	onDeleteBook,
}) => {
	const [imageError, setImageError] = useState(false);

	return (
		<div className="mt-4 mr-4 ml-4 flex flex-col justify-evenly flex-wrap shadow-[0_4px_30px_rgba(0,0,0,0.8)] backdrop-blur-sm hover:scale-105 bg-gradient-to-br from-black via-gray-900 to-black text-white w-64 min-h-[442px] transition-all rounded-[15px] hover:shadow-[0_12px_24px_rgba(255,255,255,0.08)] duration-600 ease-in-out">
			<div className="flex items-center justify-center">
				{!imageError ? (
					<img
						src={book.coverUrl}
						alt={`${book.title} cover`}
						onError={() => setImageError(true)}
						className="object-contain h-[278px] rounded-t-[15px]"
					/>
				) : (
					<div className="flex items-center justify-center w-full h-[278px] bg-gray-800 rounded-t-[15px]">
						<BookOpenIcon className="h-12 w-12 text-gray-500" />
					</div>
				)}
			</div>

			<div className="p-4">
				<h3 className="text-lg font-semibold">{book.title}</h3>
				<p className="text-sm mb-2">by {book.author}</p>

				{isExpanded && (
					<p className="mb-2">{book.fullDescription || book.description}</p>
				)}

				<button
					onClick={() => onShowMore(book.id)}
					className="border-none rounded-[10px] text-sm cursor-pointer font-medium font-inter transition-transform duration-500 ease-in-out flex hover:scale-105"
				>
					{isExpanded ? (
						<>
							<ChevronUpIcon className="h-5 w-5 mr-1" />
							Show Less
						</>
					) : (
						<>
							<EyeIcon className="h-5 w-5 mr-1" />
							Show More
						</>
					)}
				</button>

				<div className="flex justify-center items-center mt-4">
					<span className="text-xs uppercase text-gray-500">
						{book.category}
					</span>
					<div className="flex justify-between items-center w-[80%] ">
						<button
							onClick={() => onToggleFavourite(book.id, book.isFavourite)}
							aria-label="Toggle favorite"
							className="transition-transform hover:scale-110"
						>
							{book.isFavourite ? (
								<HeartSolid className="h-5 w-5 text-red-500" />
							) : (
								<HeartOutline className="h-5 w-5 text-gray-500" />
							)}
						</button>
						<button
							onClick={() => onDeleteBook(book.id)}
							aria-label="Delete book"
							className="transition-transform hover:scale-110 text-red-500 text-lg"
						>
							🗑️
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

// Dashboard Component
const Dashboard = () => {
	const [books, setBooks] = useState(booksData.books);
	const [expandedBooks, setExpandedBooks] = useState(new Set());
	const [showAllBooks, setShowAllBooks] = useState(false);

	useEffect(() => {
		fetch(API.local.books)
			.then((res) => res.json())
			.then(setBooks)
			.catch((err) => console.error("Error loading books:", err));
	}, []);

	const handleShowAllBooks = () => setShowAllBooks(true);

	const handleShowMore = (bookId) => {
		setExpandedBooks((prev) => {
			const newSet = new Set(prev);
			newSet.has(bookId) ? newSet.delete(bookId) : newSet.add(bookId);
			return newSet;
		});
	};

	const handleDelete = async (bookId) => {
		try {
			await deleteBook(bookId);
			setBooks((prev) => prev.filter((book) => book.id !== bookId));
		} catch (err) {
			console.error("Failed to delete book:", err);
		}
	};

	const handleToggleFavourite = async (bookId, currentStatus) => {
		try {
			await fetch(API.local.singleBook(bookId), {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ isFavourite: !currentStatus }),
			});
			setBooks((prevBooks) =>
				prevBooks.map((b) =>
					b.id === bookId ? { ...b, isFavourite: !currentStatus } : b,
				),
			);
		} catch (err) {
			console.error("Failed to update favorite:", err);
		}
	};

	const displayBooks = showAllBooks ? books : books.slice(0, 3);

	return (
		<main className="p-6">
			<div className="flex flex-wrap justify-evenly items-center gap-6 mx-auto">
				{displayBooks.map((book) => (
					<BookCard
						key={book.id}
						book={book}
						onShowMore={handleShowMore}
						isExpanded={expandedBooks.has(book.id)}
						onDeleteBook={handleDelete}
						onToggleFavourite={handleToggleFavourite}
					/>
				))}
			</div>

			{!showAllBooks && (
				<div className="mt-6 text-center">
					<button
						onClick={handleShowAllBooks}
						className="bg-gradient-to-br from-black via-gray-900 to-black text-white rounded-[10px] inline-flex items-center px-4 py-2 transition-all duration-300 ease-in-out shadow-[0_8px_20px_rgba(255,255,255,0.05)] hover:scale-105 hover:shadow-[0_12px_24px_rgba(255,255,255,0.08)] focus:outline-none focus:ring-2 focus:ring-white/30"
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
