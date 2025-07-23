"use client";
import { useState, useEffect } from "react";
import { fetchBookDataFromISBN } from "../services/openLibraryService";
import { addBookToLocal } from "../services/bookService";

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
    coverUrl: ""
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
        coverUrl: ""
      });
    }
  }, [isbn]);

  async function handleAdd(e) {
    e.preventDefault(); // Prevent default form submit behavior
    try {
      await addBookToLocal(bookData);
      setBookData({
        id: "",
        title: "",
        author: "",
        isbn: "",
        description: "",
        borrowedBy: "",
        dueDate: "",
        coverUrl: ""
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
        [name]: value
      }));
    }
  };

  const isbnEntered = isbn.length === 13;

  return (
    <div>
      <h2>Add Book by ISBN</h2>
      <form onSubmit={handleAdd}>
        <label>ISBN</label>
        <input
          type="text"
          name="isbn"
          value={isbn}
          onChange={handleChange}
          placeholder="Enter ISBN (13 digits)"
        />

        <label>Title</label>
        <input
          type="text"
          name="title"
          value={bookData.title}
          onChange={handleChange}
          disabled={!isbnEntered}
        />

        <label>Author</label>
        <input
          type="text"
          name="author"
          value={bookData.author}
          onChange={handleChange}
          disabled={!isbnEntered}
        />

        <label>Description</label>
        <textarea
          name="description"
          value={bookData.description}
          onChange={handleChange}
          disabled={!isbnEntered}
        />

        <label>Borrowed By</label>
        <input
          type="text"
          name="borrowedBy"
          value={bookData.borrowedBy}
          onChange={handleChange}
          disabled={!isbnEntered}
        />

        <label>Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={bookData.dueDate}
          onChange={handleChange}
          disabled={!isbnEntered}
        />

        <button type="submit" disabled={!isbnEntered}>
          Add Book
        </button>
      </form>
    </div>
  );
}
