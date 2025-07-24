"use client";
import { useState, useEffect } from "react";
import { fetchBookDataFromISBN } from "../../../services/openLibraryService";
import { addBookToLocal, fetchBooks } from "../../../services/bookService";

export default function AddBooks() {
	const [isbn, setIsbn] = useState("");
	const [bookData, setBookData] = useState({
		title: "",
		author: "",
		isbn: "",
		description: "",
		borrowedBy: "",
		dueDate: "",
		coverUrl: "",
	});

	useEffect(() => {
		if (isbn.length === 13) {
			(async () => {
				try {
					const data = await fetchBookDataFromISBN(isbn);
					setBookData((prev) => ({ ...prev, ...data }));
				} catch (error) {
					console.error(error);
				}
			})();
		} else {
			setBookData({
				title: "",
				author: "",
				isbn: "",
				description: "",
				borrowedBy: "",
				dueDate: "",
				coverUrl: "",
			});
		}
	}, [isbn]);

	async function handleAdd(e) {
		e.preventDefault();
		try {
			const newBook = {
				...bookData,
				isbn: isbn,
			};
			await addBookToLocal(newBook);
			setBookData({
				title: "",
				author: "",
				isbn: "",
				description: "",
				borrowedBy: "",
				dueDate: "",
				coverUrl: "",
			});
			setIsbn("");
		} catch (err) {
			console.error(err);
		}
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === "isbn") {
			setIsbn(value);
		} else {
			setBookData((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const isbnEntered = isbn.length === 13;

	return (
		<div className="w-[80%] mx-auto mt-8 p-6 rounded-[15px] shadow-[0_4px_30px_rgba(0,0,0,0.8)] backdrop-blur-sm bg-gradient-to-br from-black via-gray-900 to-black text-white">
			<h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-2">
				Add a New Book
			</h2>

			<form onSubmit={handleAdd} className="space-y-5">
				<div className="space-y-4">
					<div>
						<label className="block mb-1 font-medium">ISBN</label>
						<input
							type="text"
							name="isbn"
							value={isbn}
							onChange={handleChange}
							placeholder="Enter 13-digit ISBN"
							className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label className="block mb-1 font-medium">Title</label>
						<input
							type="text"
							name="title"
							value={bookData.title}
							onChange={handleChange}
							disabled={!isbnEntered}
							className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-md disabled:opacity-50"
						/>
					</div>

					<div>
						<label className="block mb-1 font-medium">Author</label>
						<input
							type="text"
							name="author"
							value={bookData.author}
							onChange={handleChange}
							disabled={!isbnEntered}
							className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-md disabled:opacity-50"
						/>
					</div>

					<div>
						<label className="block mb-1 font-medium">Description</label>
						<textarea
							name="description"
							value={bookData.description}
							onChange={handleChange}
							disabled={!isbnEntered}
							className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-md disabled:opacity-50"
							rows={3}
						/>
					</div>
				</div>

				<div className="border-t border-white/10 pt-6 space-y-4">
					<h3 className="text-lg font-semibold text-white/90">
						Borrowing Info (Optional)
					</h3>

					<div>
						<label className="block mb-1 font-medium">Borrowed By</label>
						<input
							type="text"
							name="borrowedBy"
							value={bookData.borrowedBy}
							onChange={handleChange}
							disabled={!isbnEntered}
							className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-md disabled:opacity-50"
						/>
					</div>

					<div>
						<label className="block mb-1 font-medium">Due Date</label>
						<input
							type="date"
							name="dueDate"
							value={bookData.dueDate}
							onChange={handleChange}
							disabled={!isbnEntered}
							className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-md disabled:opacity-50"
						/>
					</div>
				</div>

				<div className="pt-6 flex justify-center items-center">
					<button
						type="submit"
						disabled={!isbnEntered}
						className="w[-25%] bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg py-3 px-6 rounded-xl shadow-lg hover:shadow-blue-800 transition-all duration-300 disabled:opacity-50"
					>
						📚 Add Book
					</button>
				</div>
			</form>
		</div>
	);
}
