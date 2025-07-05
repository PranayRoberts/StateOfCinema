import React from "react";
import "./MovieCard.css";
import Star from "../../assets/star.png";

const MovieCard = ({ movie }) => (
    <a
        href={`https://www.themoviedb.org/movie/${movie.id}`}
        target='_blank'
        className='movie_card'
        rel='noopener noreferrer'
    >
        <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.original_title ? movie.original_title + ' poster' : 'Movie poster'}
            className='movie_poster'
        />
        <div className='movie_details'>
            <h3 className='movie_details_heading'>{movie.original_title}</h3>
            <div className='align_center movie_date_rate'>
                <p>{movie.release_date}</p>
                <p className='align_center'>
                    {movie.vote_average}
                    <img src={Star} alt='rating icon' className='star_icon' />
                </p>
            </div>
            <p className='movie_description'>
                {movie.overview ? movie.overview.slice(0, 100) + "..." : "No description available."}
            </p>
        </div>
    </a>
);

export default MovieCard;
