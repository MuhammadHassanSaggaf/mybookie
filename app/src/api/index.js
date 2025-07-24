const JSON_SERVER_URL = "https://my-bookie-server.onrender.com";
const OPEN_LIBRARY_API = "https://openlibrary.org";
const COVER_BASE = "https://covers.openlibrary.org/b/isbn";

export const API = {
  local: {
    books: `${JSON_SERVER_URL}/books`, // GET, POST
    singleBook: (id) => `${JSON_SERVER_URL}/books/${id}` // GET, PATCH, DELETE
  },
  public: {
    bookDataByISBN: (isbn) =>
      `${OPEN_LIBRARY_API}/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`,
    coverByISBN: (isbn) => `${COVER_BASE}/${isbn}-M.jpg`
  }
};
