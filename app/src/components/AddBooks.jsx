
"use client";
import { useState, useEffect } from "react";
import { fetchBookDataFromISBN } from "../../../services/openLibraryService";
import { addBookToLocal, fetchBooks } from "../../../services/bookService";

export default function AddBooks() {
	const [isbn, setIsbn] = useState("");
	const [bookData, setBookData] = useState({
		id: "",
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
				id: "",
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
			const books = await fetchBooks();
			const maxId = books.reduce((max, b) => (b.id > max ? b.id : max), 0);
			const newBook = {
				...bookData,
				id: Number(maxId) + 1,
			};
			await addBookToLocal(newBook);
			setBookData({
				id: "",
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
		<div className="max-w-xl mx-auto p-6 bg-[#0f172a] text-white rounded-lg shadow-md mt-8">
			<h2 className="text-2xl font-bold mb-6 border-b pb-2 border-white/10">
				Add Book by ISBN
			</h2>

			<form onSubmit={handleAdd} className="space-y-4">
				<div>
					<label className="block mb-1 font-medium">ISBN</label>
					<input
						type="text"
						name="isbn"
						value={isbn}
						onChange={handleChange}
						placeholder="Enter ISBN (13 digits)"
						className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
						className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-md disabled:opacity-50"
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
						className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-md disabled:opacity-50"
					/>
				</div>

				<div>
					<label className="block mb-1 font-medium">Description</label>
					<textarea
						name="description"
						value={bookData.description}
						onChange={handleChange}
						disabled={!isbnEntered}
						className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-md disabled:opacity-50"
						rows={3}
					/>
				</div>

				<div>
					<label className="block mb-1 font-medium">Borrowed By</label>
					<input
						type="text"
						name="borrowedBy"
						value={bookData.borrowedBy}
						onChange={handleChange}
						disabled={!isbnEntered}
						className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-md disabled:opacity-50"
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
						className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-md disabled:opacity-50"
					/>
				</div>

				<div className="pt-4">
					<button
						type="submit"
						disabled={!isbnEntered}
						className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
					>
						Add Book
					</button>
				</div>
			</form>
		</div>
	);
}
