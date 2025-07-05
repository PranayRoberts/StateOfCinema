import React, { useState } from "react";

import "./Navbar.css";
import DarkMode from "../DarkMode/DarkMode";

const Navbar = ({ onSearch }) => {
    const [search, setSearch] = useState("");

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        if (onSearch) onSearch(e.target.value);
    };

    return (
        <nav className='navbar'>
            <h1>
                <a href="/" className="navbar_logo">StateOfCinema</a>
            </h1>

            <div className='navbar_links'>
                <DarkMode />
                <input
                    type="text"
                    className="navbar_search"
                    placeholder="Search movies by title..."
                    aria-label="Search movies by title, year, or keyword"
                    value={search}
                    onChange={handleSearchChange}
                />
                <a href='#popular'>
                    Popular
                </a>
                <a href='#top_rated'>
                    Top Rated
                </a>
                <a href='#upcoming'>
                    Upcoming
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
