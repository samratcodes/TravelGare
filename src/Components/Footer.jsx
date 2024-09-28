import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black text-white text-center mt-4 py-4">
            <div className="container mx-auto px-4">
                <p>&copy; {new Date().getFullYear()} Your Company Name. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
