import React from 'react'
import { Link } from 'react-router-dom'
import '../../index.css'

function Footer() {

    const handleFooterLinkClick = (event, url) => {
        event.preventDefault();
        window.scrollTo(0, 0);
        window.location.href = url;
    };

    return (
        <>
            <footer className="site-footer">
                <div className="site-footer-top" style={{height: '10px', minHeight: 'none'}}>
                </div>
                <div className="site-footer-bottom">
                <p className="text-center text-white pt-1">Copyright © 2024 || CEO's Desk</p>
                </div>
            </footer>
        </>
    )
}

export default Footer;