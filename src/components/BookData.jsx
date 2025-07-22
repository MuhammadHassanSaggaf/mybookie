import React, { useState } from 'react';
import { Book, User, Eye, Calendar } from 'lucide-react';

const BookData = ({ 
  bookId = "1",
  title = "The Great Adventure", 
  author = "John Smith",
  imageUrl = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
  description = "An epic tale of courage and discovery that takes readers on a thrilling journey through unexplored territories. This captivating story weaves together elements of adventure, mystery, and human resilience in a way that keeps you turning pages late into the night.",
  totalCopies = 5,
  borrowedCopies = 2,
  genre = "Adventure",
  publishedYear = "2023",
  isbn = "978-1234567890",
  rating = 4.5
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const availableCopies = totalCopies - borrowedCopies;
  const availabilityStatus = availableCopies > 0 ? 'Available' : 'All Borrowed';
  const statusColor = availableCopies > 0 ? 'text-green-600' : 'text-red-600';
  
  // Truncate description for preview
  const truncatedDescription = description.length > 150 
    ? description.substring(0, 150) + "..." 
    : description;

  const handleImageError = () => {
    setImageError(true);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="md:flex">
        {/* Image Preview Section */}
        <div className="md:w-1/3 p-6">
          <div className="relative">
            {!imageError ? (
              <img
                src={imageUrl}
                alt={`Cover of ${title}`}
                className="w-full h-80 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Book size={48} className="mx-auto mb-2" />
                  <p>No Image Available</p>
                </div>
              </div>
            )}
            
            {/* Rating Badge */}
            <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
              ⭐ {rating}
            </div>
          </div>
        </div>

        {/* Book Information Section */}
        <div className="md:w-2/3 p-6">
          {/* Title and Author */}
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
            <div className="flex items-center text-lg text-gray-600 mb-2">
              <User size={18} className="mr-2" />
              <span>by {author}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 space-x-4">
              <span className="flex items-center">
                <Calendar size={14} className="mr-1" />
                {publishedYear}
              </span>
              <span>{genre}</span>
              <span>ISBN: {isbn}</span>
            </div>
          </div>

          {/* Availability Status */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Availability Status</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{totalCopies}</div>
                <div className="text-sm text-gray-600">Total Copies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{borrowedCopies}</div>
                <div className="text-sm text-gray-600">Books Borrowed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{availableCopies}</div>
                <div className="text-sm text-gray-600">Books Available</div>
              </div>
              <div className="text-center">
                <div className={`text-lg font-semibold ${statusColor}`}>
                  {availabilityStatus}
                </div>
                <div className="text-sm text-gray-600">Status</div>
              </div>
            </div>
          </div>

          {/* Book Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
              <Eye size={18} className="mr-2" />
              Description
            </h3>
            <div className="text-gray-700 leading-relaxed">
              <p className="mb-3">
                {showFullDescription ? description : truncatedDescription}
              </p>
              {description.length > 150 && (
                <button
                  onClick={toggleDescription}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
                >
                  {showFullDescription ? 'Show Less' : 'Read More'}
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button 
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                availableCopies > 0 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={availableCopies === 0}
            >
              {availableCopies > 0 ? 'Borrow Book' : 'Not Available'}
            </button>
            <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all duration-200 hover:shadow-md">
              Add to Wishlist
            </button>
            <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all duration-200 hover:shadow-md">
              Share Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example usage component to show how to use BookData
const App = () => {
  const sampleBooks = [
    {
      bookId: "1",
      title: "The Great Adventure",
      author: "John Smith",
      imageUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
      description: "An epic tale of courage and discovery that takes readers on a thrilling journey through unexplored territories. This captivating story weaves together elements of adventure, mystery, and human resilience in a way that keeps you turning pages late into the night.",
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
      description: "A fascinating exploration of artificial intelligence and its impact on society. This thought-provoking novel challenges readers to consider the future of technology and human connection in an increasingly digital world.",
      totalCopies: 3,
      borrowedCopies: 3,
      genre: "Science Fiction",
      publishedYear: "2024",
      rating: 4.2
    }
  ];

  const [currentBook, setCurrentBook] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">The Booker - Library System</h1>
        
        {/* Book Navigation */}
        <div className="text-center mb-6">
          <button
            onClick={() => setCurrentBook(0)}
            className={`mx-2 px-4 py-2 rounded ${currentBook === 0 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Book 1
          </button>
          <button
            onClick={() => setCurrentBook(1)}
            className={`mx-2 px-4 py-2 rounded ${currentBook === 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Book 2
          </button>
        </div>

        <BookData {...sampleBooks[currentBook]} />
      </div>
    </div>
  );
};

export default App;
