"use client";
import React, { useState } from "react";
import {
  Book,
  ChevronUp,
  Eye,
  ArrowLeft,
  Plus,
  Heart,
} from "your-icon-library";

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
        {!book.isAvailable && ( // If book is not available, show "Borrowed" label
          <div>Borrowed</div>
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
                Show Less
              </>
            ) : (
              <>
                <Eye />
                Show More
              </>
            )}
          </button>

          {!book.isAvailable && ( // If borrowed, show who borrowed it
            <div>Borrowed by {book.borrowedBy}</div>
          )}

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
  const [expandedBooks, setExpandedBooks] = useState(new Set());
  const [showAllBooks, setShowAllBooks] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");

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

  // Switch to showing all books and library view
  const handleShowAllBooks = () => {
    setShowAllBooks(true);
    setCurrentView("library");
  };

  // Return to dashboard view and reset expansions
  const handleBackToDashboard = () => {
    setShowAllBooks(false);
    setCurrentView("dashboard");
    setExpandedBooks(new Set());
  };

  const recentBooks = sampleBooks.slice(0, 3);
  const displayBooks = currentView === "dashboard" ? recentBooks : sampleBooks; // Determine list to render

  // Returns the title text based on current view
  const getViewTitle = () => {
    switch (currentView) {
      case "library":
        return "Full Library";
      case "add":
        return "Add New Book";
      case "borrowed":
        return "Borrowed Books";
      case "favorites":
        return "Favorites";
      default:
        return "Your Library Dashboard";
    }
  };

  return (
    <div>
      {" "}
      {/* Page wrapper */}
      <header>
        <div>
          <div>
            <div>
              {currentView !== "dashboard" && ( // If not on dashboard, show back button
                <button
                  onClick={handleBackToDashboard}
                  aria-label="Back to dashboard"
                >
                  <ArrowLeft />
                </button>
              )}
              <h1>
                {getViewTitle()} {/* Display current view title */}
              </h1>
            </div>
            <nav>
              {" "}
              {/* Navigation buttons for different views */}
              <button onClick={() => setCurrentView("add")}>
                <Plus />
                Add Book
              </button>
              <button onClick={() => setCurrentView("borrowed")}>
                Borrowed
              </button>
              <button onClick={() => setCurrentView("favorites")}>
                Favorites
              </button>
            </nav>
          </div>
        </div>
      </header>
      {/* Main content area switching by view */}
      <main>
        {currentView === "dashboard" && (
          <>
            {" "}
            {/* Dashboard view: show recent books and a button to view all */}
            <div>
              <h2>Recently Added</h2>
              <p>Your latest book additions</p>
            </div>
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
                Show All Books ({sampleBooks.length} total)
              </button>
            </div>
          </>
        )}

        {currentView === "library" && (
          <>
            {" "}
            {/* Full library view */}
            <div>
              <h2>Complete Collection</h2>
              <p>Browse your entire library</p>
            </div>
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
          </>
        )}

        {currentView === "add" && (
          <div>
            {" "}
            {/* "Add New Book" placeholder */}
            <div>
              <h2>Add New Book</h2>
              <p>This would contain your book addition form.</p>
              <div>
                <p>
                  Form components would go here - title, author, description,
                  cover upload, etc.
                </p>
              </div>
            </div>
          </div>
        )}

        {(currentView === "borrowed" || currentView === "favorites") && (
          <div>
            {" "}
            {/* Empty state for borrowed or favorites views */}
            <div>
              <Book />
              <h3>
                {currentView === "borrowed"
                  ? "No Borrowed Books"
                  : "No Favorites Yet"}
              </h3>
              <p>
                {currentView === "borrowed"
                  ? "Books you've lent out will appear here."
                  : "Books you mark as favorites will appear here."}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
export default Dashboard;
