import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL, API_KEY, IMAGE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import { Descriptions, Button, Row } from 'antd';
import './MovieDetailsPage.css';
import GridCard from '../LandingPage/Sections/GridCard';

function MovieDetailsPage(props) {

    const [Movie, setMovie] = useState([]);
    const [Crews, setCrews] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false);

    useEffect(() => {
        const movieId = props.match.params.movieId

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
    }, [])

    const toggleActors = () => {
        setActorToggle(!ActorToggle);
    }

    return (
        <div style={{ width: '100%', margin: 0 }}>
            {Movie &&
                <MainImage image={`${IMAGE_URL}w1280${Movie.backdrop_path && Movie.backdrop_path}`} title={Movie.original_title} description={Movie.overview} />
            }

            <br />
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type="primary">Add to Favorites</Button>
                </div>

            </div>

            {/*Movie Information*/}

            <div style={{ display: 'flex', justifyContent: 'center' }}>

                <Descriptions title={<span style={{ color: 'white' }}>Movie Information</span>} bordered>
                    <Descriptions.Item label="Title"><span style={{ color: 'white' }}>{Movie.original_title}</span></Descriptions.Item>
                    <Descriptions.Item label="Release Date"><span style={{ color: 'white' }}>{Movie.release_date}</span></Descriptions.Item>
                    <Descriptions.Item label="Revenue"><span style={{ color: 'white' }}>${Movie.revenue}</span></Descriptions.Item>
                    <Descriptions.Item label="Runtime"><span style={{ color: 'white' }}>{Movie.runtime} minutes</span></Descriptions.Item>
                    <Descriptions.Item label="Votes (Average)" span={2}><span style={{ color: 'white' }}>{Movie.vote_average}</span></Descriptions.Item>
                    <Descriptions.Item label="Vote Count"><span style={{ color: 'white' }}>{Movie.vote_count}</span></Descriptions.Item>
                    <Descriptions.Item label="Status"><span style={{ color: 'white' }}>{Movie.status}</span></Descriptions.Item>
                    <Descriptions.Item label="Popularity"><span style={{ color: 'white' }}>{Movie.popularity}</span></Descriptions.Item>
                </Descriptions>
            </div>
            <br />

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="primary" onClick={toggleActors}>View Actors</Button>
            </div>

            {/*Grid Card for Crew */}
            {ActorToggle &&
                <Row gutter={[16, 16]}>
                    {Crews && Crews.map((crew, index) => {
                        return (
                            <React.Fragment key={index}>
                                {crew.profile_path &&
                                    <GridCard actor image={`${IMAGE_URL}w500${crew.profile_path}`}
                                    />}
                            </React.Fragment>
                        )
                    })}

                </Row>
            }



        </div>
    )
}

export default MovieDetailsPage
