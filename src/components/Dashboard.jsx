"use client";
import React, { useState } from "react";
import {
  Book,
  ChevronUp,
  Eye,
  ArrowLeft,
  Plus,
  Heart,
}  from "lucide-react";

// Import static data
 import booksData from "../data/books.json";

// Component for displaying individual book information
const BookCard = ({ book, onShowMore, isExpanded }) => {
  const [imageError, setImageError] = useState(false); //Tracking if image fasiled to load

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
            <Book /> {/* Placeholder icon */}
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
            aria-expanded={isExpanded} // Accessibility attribute
            aria-controls={`book-description-${book.id}`} // Link to controlled element
          >
            {isExpanded ? (
              <>
                <ChevronUp />
                Show More
              </>
            ) : (
              <>
                <Eye />
                Show Less
              </>
            )}
          </button>


          <div>
            {" "}
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
  const [books]         = useState(booksData.books);
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
