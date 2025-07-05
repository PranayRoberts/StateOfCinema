import React, { useEffect, useState } from "react";
import _ from "lodash";
import "./MovieList.css";
import MovieCard from "./MovieCard";
import FilterGroup from "./FilterGroup";

const MovieList = ({ type, title, search }) => {
  const [movies, setMovies] = useState([]);
  const [filterMovies, setFilterMovies] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState({ by: "default", order: "asc" });

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    let filtered = movies;
    if (minRating > 0)
      filtered = filtered.filter((movie) => movie.vote_average >= minRating);
    if (search && search.trim() !== "")
      filtered = filtered.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
      );
    if (sort.by !== "default")
      filtered = _.orderBy(filtered, [sort.by], [sort.order]);
    setFilterMovies(filtered);
  }, [movies, minRating, search, sort]);

  const fetchMovies = async () => {
    let allResults = [];
    // Each page returns 20 movies, so page=2 fetches up to 40 movies
    for (let page = 1; page <= 2; page++) {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${type}?api_key=183928bab7fc630ed0449e4f66ec21bd&page=${page}`
      );
      const data = await response.json();
      if (data.results) {
        allResults = allResults.concat(data.results);
      }
    }
    setMovies(allResults);
    setFilterMovies(allResults);
  };

  const handleFilter = (rate) =>
    setMinRating(rate === minRating ? 0 : rate);
  const handleSort = (e) =>
    setSort((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <section className="movie_list" id={type}>
      <header className="align_center movie_list_header">
        <h2 className="align_center movie_list_heading">{title}</h2>
        <div className="align_center movie_list_fs">
          <FilterGroup
            minRating={minRating}
            onRatingClick={handleFilter}
            ratings={[8, 7, 6]}
          />
          <select
            name="by"
            onChange={handleSort}
            value={sort.by}
            className="movie_sorting"
          >
            <option value="default">SortBy</option>
            <option value="release_date">Date</option>
            <option value="vote_average">Rating</option>
          </select>
          <select
            name="order"
            onChange={handleSort}
            value={sort.order}
            className="movie_sorting"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </header>
      <div className="movie_cards">
        {filterMovies.length === 0 ? (
          <div className="movie_no_results">
            We checked the archives. No matches rolled in.
          </div>
        ) : (
          filterMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        )}
      </div>
    </section>
  );
};

export default MovieList;
