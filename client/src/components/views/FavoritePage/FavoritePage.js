import React, { useEffect, useState } from 'react'
import './FavoritePage.css'
import axios from 'axios'
import {Button, Popover} from 'antd';
import {IMAGE_URL} from '../../Config';

function FavoritePage() {

    const variables = { userFrom: localStorage.getItem('userId') }
    const [FavoritedMovies, setFavoritedMovies] = useState([]);

    useEffect(() => {
        fetchFavoritedMovies();
    }, [])

    const fetchFavoritedMovies = () => {
        axios.post('/api/favorite/getFavoritedMovie', variables)
            .then(response => {
                if (response.data.success) {
                    setFavoritedMovies(response.data.favorites);
                    console.log(response.data.favorites);
                } else {
                    alert("DB Error: Failed to get favorited movies.");
                }
            })
    }

    const clickRemove = (movieId) => {

        const variable = {
            movieId: movieId,
            userFrom: localStorage.getItem('userId'),

        }
        axios.post('/api/favorite/removeFromFavorite', variable)
        .then(response => {
            if (response.data.success) {
                fetchFavoritedMovies();

            } else {
                alert("Failed to remove from favorites");
            }
        })
    }

    const renderTableBody = FavoritedMovies.map((movie, index) => {

        console.log(movie);

        const content = (
            <div>
                {movie.movieImage ? <img src={`${IMAGE_URL}w500${movie.movieImage}`} alt="moviePoster" /> : "no image"}
            </div>
        )

        return (
            <tr key={index}>
                <Popover content={content} title={`${movie.movieTitle}`}><td>{movie.movieTitle}</td></Popover>
                <td>{movie.movieRunTime} minutes</td>
                <td><Button type="primary" onClick={() => clickRemove(movie.movieId)}>Remove from Favorites</Button></td>
            </tr>
        )
    })
    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h3 style={{ color: 'rgb(245, 197, 24)' }}>My Favorites</h3>
            <hr />
            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Run Time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableBody}
                </tbody>
            </table>

        </div>


    )
}

export default FavoritePage
