import React, { useState, useEffect } from "react";
import BackIcon from '../assets/images/Back.svg';
import SearchIcon from '../assets/images/Search.svg';
import CancelIcon from '../assets/images/Cancel.svg';
import axios from "axios";
import { Link } from "react-router-dom";

export default function Products() {
    const [searchText, setSearchText] = useState('');
    const [productsData, setProductsData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12); // Adjust the number of items per page as needed
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // Function to fetch products data
        const fetchProducts = async (query = '') => {
            setLoading(true);
            try {
                const response = await axios.get(`http://skunkworks.ignitesol.com:8000/books/`, {
                    params: { search: query }
                });
                setProductsData(response.data.results);
                setCurrentPage(1); // Reset to first page on new search
            } catch (error) {
                console.error("Error fetching products data:", error);
            } finally {
                setLoading(false);
            }
        };

        // Fetch data on component mount or when searchText changes
        fetchProducts(searchText);
    }, [searchText]);

    const handleInputChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleClearClick = () => {
        setSearchText('');
        setCurrentPage(1); // Reset to first page on clear
    };

    const truncateText = (text, limit) => {
        return text.length > limit ? text.substring(0, limit) + '...' : text;
    };

    // Paginate the filtered products
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = productsData.slice(indexOfFirstProduct, indexOfLastProduct);

    // Calculate total pages
    const totalPages = Math.ceil(productsData.length / itemsPerPage);

    return (
        <>
        <section>
            <div className="container mt-5 pd-25">
                <div className="d-flex align-items-center">
                    <div className="category-icon mr-3">
                        <Link to="/" className='text-decoration-none'>
                        <img src={BackIcon} alt="Back Icon" className="back-icon-h pd-r-10" />
                        </Link>
                    </div>
                    <h2 className="mb-0 h2-tag">Fiction</h2>
                </div>

                <div className="search-container mt-4">
                    <img src={SearchIcon} alt="Search Icon" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="search-input"
                        value={searchText}
                        onChange={handleInputChange}
                    />
                    <img
                        src={CancelIcon}
                        alt="Cancel Icon"
                        className="close-icon"
                        onClick={handleClearClick}
                    />
                </div>
            </div>
        </section>
      
    <section className="m-container" style={{paddingTop:'15px'}}>
        <div className="container">
            {loading ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner"></div>
                </div>
            ) : (
                <>
                <div className="row  p-10">
                    {currentProducts.length > 0 ? (
                        currentProducts.map((product, index) => {
                            const imageUrl = product.formats["image/jpeg"];
                            const authorName = product.authors.length > 0 ? product.authors[0].name : "Unknown Author";

                            return (
                                <div className="col-4 col-lg-3 mb-4" key={index}>
                                    <Link to={`/book/${product.id}`} className="text-decoration-none">
                                        <div className="card text-center card-height">
                                            <img src={imageUrl} className="list-book" alt={product.title} />
                                            <div className="card-body">
                                                <h5 className="card-title">{truncateText(product.title, 20)}</h5>
                                                <p className="card-text">{authorName}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-12">
                            <p>No products found</p>
                        </div>
                    )}
                </div>

                <div className="pagination mt-3 d-flex justify-content-center" style={{paddingBottom:'15px'}}>
                    <button
                        className="btn btn-primary"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span className="mx-3">Page {currentPage} of {totalPages}</span>
                    <button
                        className="btn btn-primary"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
                </>
            )}
        </div>
    </section>
        </>
    );
}
