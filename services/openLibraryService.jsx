import { API } from "../app/src/api/API";

export async function fetchBookDataFromISBN(isbn) {
  const res = await fetch(API.public.bookDataByISBN(isbn));
  const data = await res.json();
  const book = data[`ISBN:${isbn}`];

  if (!book) throw new Error("Book not found");

  return {
    title: book.title || "Unknown Title",
    author: book.authors?.[0]?.name || "Unknown Author",
    isbn,
    description:
      typeof book.notes === "string"
        ? book.notes
        : typeof book.notes?.value === "string"
        ? book.notes.value
        : "No description available",
    coverUrl: API.public.coverByISBN(isbn),
    borrowedBy: "",
    dueDate: ""
  };
}
