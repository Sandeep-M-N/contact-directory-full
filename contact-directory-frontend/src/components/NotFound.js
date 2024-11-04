// NotFound.js
import React from 'react';
import './NotFound.css'; // Import the CSS file

const NotFound = () => {
    return (
        <div className="not-found-container">
            <div className="not-found">
                <h1 className="error-code">404</h1>
                <p className="error-message">Oops! Page Not Found</p>
                <a href="/" className="home-link">Go Home</a>
            </div>
        </div>
    );
};

export default NotFound;
