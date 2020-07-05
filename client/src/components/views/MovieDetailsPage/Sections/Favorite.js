import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import axios from 'axios'
import { useSelector } from 'react-redux';

function Favorite(props) {
    const user = useSelector(state => state.user)

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);

    const variable = {
        userFrom: props.userFrom,
        movieId: props.movieId,
        movieTitle: props.movieInfo.original_title,
        movieImage: props.movieInfo.backdrop_path,
        movieRunTime: props.movieInfo.runtime
    }

    const clickFavorite = () => {
        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in first');
        }

        if (Favorited) {
            //when already added
            axios.post('/api/favorite/removeFromFavorite', variable)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1);
                        setFavorited(!Favorited);


                    } else {
                        alert("Failed to remove from favorites");
                    }
                })
        } else {
            //when not adding yet

            axios.post('/api/favorite/addToFavorite', variable)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1);
                        setFavorited(!Favorited)
                    } else {
                        alert("Failed to add to favorites");
                    }
                })
        }
    }

    useEffect(() => {

        axios.post('/api/favorite/favoriteNumber', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.FavoriteNumber);
                    console.log("yeehaw1 aaa" + response.data.FavoriteNumber);
                    setFavoriteNumber(response.data.FavoriteNumber);
                } else {
                    console.log('Failed to get the number of favorites. Please log in first.');
                }
            })

        axios.post('/api/favorite/favorited', variable)
            .then(response => {
                if (response.data.success) {
                    console.log("yeehaw2");
                    setFavorited(response.data.favorited);
                } else {
                    
                    console.log("Failed to get information of favorites. Please log in first.");
                }
            })

    }, [])


    return (
        <div>
            <Button onClick={clickFavorite} type="primary">{!Favorited ? "Add to Favorites" : "Remove from Favorites"} </Button>
            <span style={{ display: 'inline-block', padding: '5px', color: 'black', backgroundColor: '#D3D3D3', borderRadius: '5px' }}>{FavoriteNumber}</span>
        </div>
    )
}

export default Favorite
