# My Bookie 📚

A modern, responsive personal book tracking application built with Next.js and React. Manage your book collection, track borrowing status, mark favorites, and discover new books through ISBN lookup.

![My Bookie Banner](https://via.placeholder.com/800x200/0f172a/white?text=My+Bookie+-+Personal+Book+Tracker)

## ✨ Features

### 📖 Book Management
- **Add Books by ISBN**: Automatically fetch book details from Open Library API
- **Manual Book Entry**: Edit and customize book information
- **Book Deletion**: Remove books from your collection
- **Cover Images**: Automatic cover image fetching with fallback placeholder

### 📑 Organization & Filtering
- **Dashboard View**: Grid layout showing all books with quick actions
- **Favorites System**: Mark and filter favorite books
- **Borrowing Tracker**: Track who borrowed your books and due dates
- **Smart Sidebar**: Collapsible sections for different book categories

### 🎨 Modern UI/UX
- **Dark Theme**: Sleek gradient design with glassmorphism effects
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Smooth Animations**: Hover effects and transitions
- **Interactive Components**: Expandable book cards and dynamic sidebars

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **UI Library**: React 18 with Hooks
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Backend**:  Render hosting JSON-Server (Development)
- **API Integration**: Open Library API
- **Font**: Geist (Google Fonts)

## 📁 Project Structure

```
my-bookie/
├── app/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddBooks.jsx       # ISBN-based book addition
│   │   │   ├── BookData.jsx       # Individual book display
│   │   │   ├── Dashboard.jsx      # Main book grid view
│   │   │   ├── Footer.jsx         # App footer
│   │   │   ├── NavBar.jsx         # Navigation component
│   │   │   └── SideBar.jsx        # Filterable book sidebar
│   │   ├── api/
│   │   │   └── index.js           # API endpoints configuration
│   │   └── data/
│   │       └── db.json            # Sample data structure
│   ├── add-book/
│   │   └── page.js                # Add book page
│   ├── borrowed/
│   │   └── page.js                # Borrowed books page
│   ├── favourites/
│   │   └── page.js                # Favorite books page
│   ├── globals.css                # Global styles
│   ├── layout.js                  # Root layout
│   └── page.js                    # Home page
├── services/
│   ├── bookService.js             # Local API operations
│   └── openLibraryService.js      # External API integration
└── public/
    └── icons8-book-32.png         # App favicon/logo
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm 
- JSON-Server

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:MuhammadHassanSaggaf/mybookie.git
   cd mybookie
   ```

2. **Install dependencies**
   ```bash
   npm install
  
   ```

3. **Set up JSON Server**
   ```bash
   npm install -g json-server
   ```


4. **Running Locally**

   **Terminal 1 - JSON Server:**
   ```bash
   json-server --watch db.json --port 3001
   ```

   **Terminal 2 - Next.js App:**
   ```bash
   npm run start
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 API Configuration

The app uses two main API sources:

### My Bookie Server API
```javascript
const JSON_SERVER_URL = "https://my-bookie-server.onrender.com";
```
- **GET** `/books` - Fetch all books
- **POST** `/books` - Add new book
- **GET** `/books/:id` - Get single book
- **PATCH** `/books/:id` - Update book
- **DELETE** `/books/:id` - Delete book

### Open Library API
```javascript
const OPEN_LIBRARY_API = "https://openlibrary.org";
const COVER_BASE = "https://covers.openlibrary.org/b/isbn";
```
- Book data by ISBN
- Cover images by ISBN

## 🎯 Usage Guide

### Adding Books

1. **Navigate to "Add Book" page**
2. **Enter 13-digit ISBN** - Book details auto-populate
3. **Edit details** if needed (title, author, description)
4. **Add borrowing info** (optional)
5. **Click "Add Book"**

### Managing Books

- **View All Books**: Dashboard shows book grid with covers
- **Mark Favorites**: Click heart icon on any book
- **Track Borrowing**: Add borrower name and due date
- **Delete Books**: Click trash icon to remove
- **Expand Details**: "Show More" button for full descriptions

### Filtering & Navigation

- **Sidebar Navigation**: Browse by All/Favorites/Borrowed
- **Click to Focus**: Select any book from sidebar
- **Responsive Menu**: Mobile hamburger menu for navigation

### Key CSS Classes
```css
/* Glassmorphism Cards */
.shadow-[0_4px_30px_rgba(0,0,0,0.8)] backdrop-blur-sm

/* Hover Effects */
.hover:scale-105 transition-transform duration-600

/* Gradient Buttons */
.bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: `< 768px` - Stacked layout, hamburger menu
- **Tablet**: `768px - 1024px` - Sidebar + main content
- **Desktop**: `> 1024px` - Full layout with expanded sidebar

### Mobile Features
- Collapsible navigation menu
- Touch-friendly buttons
- Optimized card layouts
- Responsive typography


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Authors

- Jennifer Nyambura
- Michael Fuchaka
- Muhammad Saggaf
- Victor Mwatu
