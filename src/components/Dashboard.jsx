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
