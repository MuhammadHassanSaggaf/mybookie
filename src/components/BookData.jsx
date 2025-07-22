import React, { useState } from 'react';

const BookData = ({ 
  bookId = "1",
  title = "Sample Book Title", 
  author = "Sample Author",
  imageUrl = "https://via.placeholder.com/300x400",
  description = "This is a sample book description that explains what the book is about.",
  totalCopies = 5,
  borrowedCopies = 2,
  genre = "Fiction",
  publishedYear = "2023",
  isbn = "978-1234567890",
  rating = 4.5,
  onBorrow = null // Function to handle borrow action
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isProcessingBorrow, setIsProcessingBorrow] = useState(false);
  
  const availableCopies = totalCopies - borrowedCopies;
  const isAvailable = availableCopies > 0;

  const handleImageError = () => {
    setImageError(true);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleBorrow = async () => {
    if (!isAvailable || isProcessingBorrow) return;
    
    setIsProcessingBorrow(true);
    
    try {
      if (onBorrow) {
        // Call the parent component's borrow function
        await onBorrow({
          bookId,
          title,
          author,
          borrowDate: new Date().toISOString()
        });
      } else {
        // Default behavior - simulate API call
        console.log(`Borrowing book: ${title} (ID: ${bookId})`);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        alert(`Successfully borrowed "${title}"!`);
      }
    } catch (error) {
      console.error('Error borrowing book:', error);
      alert('Failed to borrow book. Please try again.');
    } finally {
      setIsProcessingBorrow(false);
    }
  };

  return (
    <div>
      {/* Book Title */}
      <div>
        <h1>{title}</h1>
        <p>Book ID: {bookId}</p>
      </div>

      {/* Main Content Container */}
      <div>
        {/* Image Preview Section */}
        <div>
          <h2>Book Cover</h2>
          {!imageError ? (
            <img
              src={imageUrl}
              alt={`Cover of ${title}`}
              onError={handleImageError}
            />
          ) : (
            <div>
              <p>No Image Available</p>
              <p>📚</p>
            </div>
          )}
          
          {rating && (
            <div>
              <span>Rating: {rating}/5 ⭐</span>
            </div>
          )}
        </div>

        {/* Book Information Section */}
        <div>
          {/* Author Information */}
          <div>
            <h2>Author Information</h2>
            <p>Author: {author}</p>
            {genre && <p>Genre: {genre}</p>}
            {publishedYear && <p>Published: {publishedYear}</p>}
            {isbn && <p>ISBN: {isbn}</p>}
          </div>

          {/* Books Borrowed/Available Section */}
          <div>
            <h2>Availability Status</h2>
            <div>
              <div>
                <p>Total Copies: {totalCopies}</p>
              </div>
              <div>
                <p>Books Borrowed: {borrowedCopies}</p>
              </div>
              <div>
                <p>Books Available: {availableCopies}</p>
              </div>
              <div>
                <p>Status: {isAvailable ? 'Available' : 'All Borrowed'}</p>
              </div>
            </div>
          </div>

          {/* Book Description */}
          <div>
            <h2>Description</h2>
            <div>
              <p>
                {showFullDescription ? description : 
                 (description.length > 150 ? description.substring(0, 150) + "..." : description)}
              </p>
              {description.length > 150 && (
                <button onClick={toggleDescription}>
                  {showFullDescription ? 'Show Less' : 'Read More'}
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div>
            <button 
              onClick={handleBorrow}
              disabled={!isAvailable || isProcessingBorrow}
            >
              {isProcessingBorrow ? 'Processing...' : 
               (isAvailable ? 'Borrow Book' : 'Not Available')}
            </button>
            <button>Add to Wishlist</button>
            <button>Share Book</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example parent component showing how to use BookData with functional borrow
const App = () => {
  const [books, setBooks] = useState([
    {
      bookId: "1",
      title: "The Great Adventure",
      author: "John Smith",
      imageUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
      description: "An epic tale of courage and discovery that takes readers on a thrilling journey through unexplored territories. This captivating story weaves together elements of adventure, mystery, and human resilience.",
      totalCopies: 5,
      borrowedCopies: 2,
      genre: "Adventure",
      publishedYear: "2023",
      rating: 4.5
    },
    {
      bookId: "2", 
      title: "Digital Dreams",
      author: "Sarah Johnson",
      imageUrl: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=300&h=400&fit=crop",
      description: "A fascinating exploration of artificial intelligence and its impact on society.",
      totalCopies: 3,
      borrowedCopies: 3,
      genre: "Science Fiction", 
      publishedYear: "2024",
      rating: 4.2
    }
  ]);

  const [currentBookIndex, setCurrentBookIndex] = useState(0);

  // Functional borrow handler
  const handleBorrow = async (borrowInfo) => {
    console.log('Borrow request received:', borrowInfo);
    
    // Update the book's borrowed count
    setBooks(prevBooks => 
      prevBooks.map(book => 
        book.bookId === borrowInfo.bookId 
          ? { ...book, borrowedCopies: book.borrowedCopies + 1 }
          : book
      )
    );
    
    // Here you would typically make an API call to your backend
    // Example:
    // await fetch('/api/borrow', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(borrowInfo)
    // });
    
    console.log(`Book "${borrowInfo.title}" borrowed successfully!`);
  };

  return (
    <div>
      <h1>The Booker - Library System</h1>
      
      <div>
        <button onClick={() => setCurrentBookIndex(0)}>Book 1</button>
        <button onClick={() => setCurrentBookIndex(1)}>Book 2</button>
      </div>

      <BookData 
        {...books[currentBookIndex]} 
        onBorrow={handleBorrow}
      />
    </div>
  );
};

export default App;