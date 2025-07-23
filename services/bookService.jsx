import { API } from "../app/src/api"

// Get all books
export async function fetchBooks() {
  const res = await fetch(API.local.books);
  return await res.json();
}

// Add new book
export async function addBookToLocal(book) {
  const res = await fetch(API.local.books, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  return await res.json();
}

// Update book
export async function updateBook(id, updates) {
  const res = await fetch(API.local.singleBook(id), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return await res.json();
}

// Delete book
export async function deleteBook(id) {
  const res = await fetch(API.local.singleBook(id), { method: "DELETE" });
  return res.ok;
}
