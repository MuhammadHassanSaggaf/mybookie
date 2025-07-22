"use client";
import React, { useState } from "react";
import { Book, ChevronUp, Eye, Heart } from "lucide-react";

// Import static data
import booksData from "../data/books.json";

// Component for displaying individual book information
const BookCard = ({ book, onShowMore, isExpanded }) => {
  const [imageError, setImageError] = useState(false); //Tracking if image failed to load

  return (
    <div className="cardContainer">
      <div id="img-available">
        {!imageError ? (
          <img
            src={book.coverUrl}
            alt={`${book.title} cover`}
            onError={() => setImageError(true)}
          />
        ) : (
          <div>
            <Book aria-label="Book cover not available" />{" "}
            {/* Placeholder icon */}
          </div>
        )}
      </div>

      <div>
        {/* Textual details section */}
        <h3>{book.title}</h3>
        <p>by {book.author}</p>
        <div>
          {/* Description and action buttons */}
          <p>{isExpanded ? book.fullDescription : book.description}</p>

          <button
            onClick={() => onShowMore(book.id)} // Toggle description expansion
          >
            {isExpanded ? (
              <>
                <ChevronUp />
                Show Less
              </>
            ) : (
              <>
                <Eye />
                Show More
              </>
            )}
          </button>

          <div>
            {/* Category and favorite button */}
            <span>{book.category}</span>
            <button
              aria-label="Add to favorites" // Accessibility label
            >
              <Heart />
            </button>
          </div>
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

  const handleShowAllBooks = () => {
    setShowAllBooks(true);
  };

  // Toggles expansion state for a particular book
  const handleShowMore = (bookId) => {
    setExpandedBooks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(bookId)) {
        newSet.delete(bookId);
      } else {
        newSet.add(bookId);
      }
      return newSet;
    });
  };

  const displayBooks = showAllBooks ? books : books.slice(0, 3);

  return (
    <main>
      <div>
        {displayBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onShowMore={handleShowMore}
            isExpanded={expandedBooks.has(book.id)}
          />
        ))}
      </div>
      <div>
        <button onClick={handleShowAllBooks}>
          <Book />
          Show All Books ({books.length} total)
        </button>
      </div>
    </main>
  );
};
export default Dashboard;
