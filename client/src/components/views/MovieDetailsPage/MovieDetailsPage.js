import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL, API_KEY, IMAGE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import { Descriptions, Button, Row } from 'antd';
import './MovieDetailsPage.css';
import GridCard from '../LandingPage/Sections/GridCard';
import Favorites from './Sections/Favorite';
import Comments from './Sections/Comments';
import LikeDislikes from './Sections/LikeDislikes';

function MovieDetailsPage(props) {

    const movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([]);
    const [Crews, setCrews] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false);
    const [CommentLists, setCommentLists] = useState([]);
    const movieVariable = {
        movieId: movieId
    }

    useEffect(() => {


        axios.get(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
            .then(response => response.data)
            .then(response => {
                console.log(response);
                setMovie(response);

                fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
                    .then(response => response.json())
                    .then(response => {
                        console.log(response);
                        setCrews(response.cast);

                    })
            })
            .catch((error) => {
                console.log(error);
            })

        axios.post('/api/comment/getComments', movieVariable)
            .then(response => {
                console.log(response)
                if (response.data.success) {
                    console.log('response.data.comments', response.data.comments)
                    setCommentLists(response.data.comments)
                } else {
                    alert('Failed to get comments Info')
                }
            })
    }, [])

    const toggleActors = () => {
        setActorToggle(!ActorToggle);
    }

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }

    return (
        <div style={{ width: '100%', margin: 0 }}>
            {Movie &&
                <MainImage image={`${IMAGE_URL}w1280${Movie.backdrop_path && Movie.backdrop_path}`} title={Movie.original_title} description={Movie.overview} movieId={movieId} />
            }

            {/*Favorites Button */}

            <br />
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorites userFrom={localStorage.getItem('userId')} movieId={movieId} movieInfo={Movie} />
                </div>

            </div>

            {/*Movie Information*/}

            <div style={{ display: 'flex', justifyContent: 'center' }}>

                <Descriptions title={<span style={{ color: 'white' }}>Movie Information</span>} bordered>
                    <Descriptions.Item label="Title"><span style={{ color: 'white' }}>{Movie.original_title}</span></Descriptions.Item>
                    <Descriptions.Item label="Release Date"><span style={{ color: 'white' }}>{Movie.release_date}</span></Descriptions.Item>
                    <Descriptions.Item label="Revenue"><span style={{ color: 'white' }}>${Movie.revenue}</span></Descriptions.Item>
                    <Descriptions.Item label="Runtime"><span style={{ color: 'white' }}>{Movie.runtime} minutes</span></Descriptions.Item>
                    <Descriptions.Item label="Average Rating" span={2}><span style={{ color: 'white' }}>{Movie.vote_average}</span></Descriptions.Item>
                    <Descriptions.Item label="Vote Count"><span style={{ color: 'white' }}>{Movie.vote_count}</span></Descriptions.Item>
                    <Descriptions.Item label="Status"><span style={{ color: 'white' }}>{Movie.status}</span></Descriptions.Item>
                    <Descriptions.Item label="Popularity"><span style={{ color: 'white' }}>{Movie.popularity}</span></Descriptions.Item>
                </Descriptions>
            </div>
            <br />

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="primary" onClick={toggleActors}>{!ActorToggle ? "View Actors" : "Hide Actors"}</Button>
            </div>
            <br />

            {/*Grid Card for Crew */}
            {ActorToggle &&
                <Row gutter={[16, 16]}>
                    {Crews && Crews.map((crew, index) => {
                        return (
                            <React.Fragment key={index}>
                                {crew.profile_path &&
                                    <GridCard actor image={`${IMAGE_URL}w500${crew.profile_path}`} name={crew.name}
                                    />}
                            </React.Fragment>
                        )
                    })}

                </Row>
            }

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <LikeDislikes video videoId={movieId} userId={localStorage.getItem('userId')} />
            </div>


            {/*Comments*/}
            <Comments movieTitle={Movie.original_title} CommentLists={CommentLists} postId={movieId} refreshFunction={updateComment} />



        </div>
    )
}

export default MovieDetailsPage
