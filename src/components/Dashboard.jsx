import React, { useState } from 'react';
import { Book, ChevronUp, Eye, ArrowLeft, Plus, Heart } from "your-icon-library";



// Component for displaying individual book information
const BookCard = ({ book, onShowMore, isExpanded }) => {

  const [imageError, setImageError] = useState(false); //Tracking if image fasiled to load

  return (
   <div className='cardContainer'>
 <div  id='img-available'>
 {!imageError ? (
     <img  src={book.coverUrl} 
        alt={`${book.title} cover`}
      onError={() => setImageError(true)}  />):
       ( 
          <div>
            <Book /> {/* Placeholder icon */}
          </div>
        )}
        {!book.isAvailable && ( // If book is not available, show "Borrowed" label
          <div>
            Borrowed
          </div>
        )}
      </div>
 </div>

   
  