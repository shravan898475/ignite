import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Details() {
    const { id } = useParams(); // Get the book ID from the URL
    const [bookDetails, setBookDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Function to fetch book details
        const fetchBookDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://skunkworks.ignitesol.com:8000/books/${id}/`);
                setBookDetails(response.data);
            } catch (error) {
                console.error("Error fetching book details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!bookDetails) {
        return <div>Book details not found</div>;
    }

    const { title, authors, bookshelves, download_count, formats, languages, subjects } = bookDetails;
    const authorNames = authors.map(author => author.name).join(', ');
    const bookFormats = Object.entries(formats).map(([format, url], index) => (
        <div key={index}>
            <a href={url} target="_blank" rel="noopener noreferrer">
                {format}
            </a>
        </div>
    ));
    const bookSubjects = subjects.join(', ');
    const bookLanguages = languages.join(', ');

    return (
        <section className='m-container'>
         <div className="container mt-5">
            <div className='row'>
                <div className='col-md-12'>
                    <h2 className='h-tag'>{title}</h2>
                    <p className='p-tag'><strong>Author(s):</strong> {authorNames || 'Unknown Author'}</p>
                    <p className='p-tag'><strong>Bookshelves:</strong> {bookshelves.join(', ')}</p>
                    <p className='p-tag'><strong>Download Count:</strong> {download_count}</p>
                    <p className='p-tag'><strong>Languages:</strong> {bookLanguages}</p>
                    <p className='p-tag'><strong>Subjects:</strong> {bookSubjects}</p>

                </div>
                <div className='col-md-12 text-center'>
                <img src={formats['image/jpeg']} className='book-img mt-5 mb-5' alt={title} />
                </div>
            </div>
           
           
        </div>
        </section>
       
    );
}
