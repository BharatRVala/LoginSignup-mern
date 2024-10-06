// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { handleError, handleSuccess } from '../utils';
// import { ToastContainer } from 'react-toastify'

// function Home() {
//     const [loggedInUser, setLoggedInUser] = useState('');
//     const [products, setProducts] = useState('');

//     const navigate = useNavigate();

//     useEffect(() => {
//         setLoggedInUser(localStorage.getItem('loggedInUser'))
//     }, [])

//     const handleLogout = (e) => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('loggedInUser');
//         handleSuccess('User loggedout');
//         setTimeout(() => {
//             navigate('/login');
//         }, 1000)
//     }
//     const fetchProducts = async () => {
//         try {
//             const url = "http://localhost:8080/products";
//             const headers = {
//                 headers: {
//                     'Authorization': localStorage.getItem('token')
//                 }
//             }
//             const response = await fetch(url, headers);
//             const result = await response.json();
//             console.log(result);
//             setProducts(result)

//         } catch (err) {
//             handleError(err)
//         }
//     }

//     useEffect(() => {
//         fetchProducts()

//     },[])
//     return (
//         <div>
//             <h1>{loggedInUser}</h1>
//             <button onClick={handleLogout}>Logout</button>
//             <div>
//                 {
//                     products && products?.map((item, index) => (
//                         <ul key={index}>
//                             <span>{item.name}:{item.price}</span>
//                         </ul>
//                     ))
//                 }
//             </div>
//             <ToastContainer />
//         </div>
//     )
// }

// export default Home
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);  // Loading state

    const navigate = useNavigate();

    // Effect to set the logged-in user from localStorage
    useEffect(() => {
        const user = localStorage.getItem('loggedInUser');
        setLoggedInUser(user || ''); // Set to empty string if null
    }, []);

    // Handle user logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User logged out');
        setLoading(true);
        setTimeout(() => {
            navigate('/login'); // Navigate to login page
        }, 1000);
    };

    // Fetch products from the server
    const fetchProducts = async () => {
          // Start loading
        console.log('Fetching products...');

        try {
            const url = "https://login-signup-mern-api-wheat.vercel.app/products";
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token') // Include auth token
                }
            };
            const response = await fetch(url, headers);
            const result = await response.json();
            console.log('Products fetched:', result);
            
            setProducts(result); // Update products state
        } catch (err) {
            handleError(err.message); // Handle errors
        } finally {
            setLoading(false);  // Stop loading
            console.log('Loading complete');
        }
    };

    // Fetch products on component mount
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Welcome, {loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>

            {loading ? (
                <div className="loading-spinner"></div> // Show loading spinner
            ) : (
                <div>
                    {products.length > 0 ? (
                        products.map((item, index) => (
                            <ul key={index}>
                                <li>{item.name}: {item.price}</li> {/* Display product info */}
                            </ul>
                        ))
                    ) : (
                        <p>No products available.</p> // Message if no products
                    )}
                </div>
            )}

            <ToastContainer />
        </div>
    );
}

export default Home;
