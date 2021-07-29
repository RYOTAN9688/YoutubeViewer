import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <>
            <h1>Not Found!</h1>
            <Link to="/">Top Page</Link>
        </>
    )

};

export default NotFoundPage;