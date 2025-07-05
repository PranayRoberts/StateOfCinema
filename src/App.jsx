import React, { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import MovieList from "./components/MovieList/MovieList";

const App = () => {
    const [search, setSearch] = useState("");

    return (
        <div className='app'>
            <Navbar onSearch={setSearch} />

            <MovieList type='popular' title='Popular' search={search} />
            <MovieList type='top_rated' title='Top Rated' search={search} />
            <MovieList type='upcoming' title='Upcoming' search={search} />

            <footer className="footer">
                <div className="footer-content">
                    <span>© {new Date().getFullYear()} StateOfCinema. All rights reserved.</span>
                </div>
            </footer>
        </div>
    );
};

export default App;
