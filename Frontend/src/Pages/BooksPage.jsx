import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import API_URL from '../config';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${API_URL}/book/get`);
        console.log('Books fetched:', response.data.books);
        setBooks(response.data.books || []);
      } catch (error) {
        toast.error('Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {books.map((book) => {
        console.log('Book id:', book.id);  // Debug id
        return (
          <div key={book.id}>
            <h3>{book.name}</h3>
            <Link to={`/book/read/${book.id}`}>Read Online</Link>
          </div>
        );
      })}
    </div>
  );
};

export default BooksPage;
