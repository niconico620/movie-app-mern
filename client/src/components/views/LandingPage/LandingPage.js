import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_URL } from '../../Config';
import axios from 'axios';
import './LandingPage.css';
import { Typography, Row } from 'antd';
import MainImage from './Sections/MainImage';
import GridCard from './Sections/GridCard';

const { Title } = Typography;

function LandingPage() {

    const [Movies, setMovies] = useState([]);

    useEffect(() => {

        axios.get(`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
            .then(response => response.data)
            .then(response => {
                console.log(response);
                //response.results because it is what is shown in the console log  
                setMovies(response.results);
            })
            .catch((error) => {
                console.log(error);
            })

    }, [])

    return (
        <div id="landingcontainer">

            {/*HEADER*/}
             {Movies[3] &&
                <MainImage image={`${IMAGE_URL}w1280${Movies[3].backdrop_path && Movies[3].backdrop_path}`} title={Movies[3].original_title} description={Movies[3].overview} />
            } 
            {/*Needed to do the above so that we can get the value of movies[0] first. Not doing so will show an undefined error because the speed
            of getting the value is much slower than the rendering of the JSX elements, thus, we do this so that it can get the value. */}



            {/*BODY*/}
            <div id="moviesbody">
                <Title level={2}>Movies by latest</Title>
                <hr />

                {/*Grid Cards. Using antd again.*/}
                <Row gutter={[16, 16]}>
                    {Movies && Movies.map((movie, index) => {
                        return(
                        <React.Fragment key={index}>
                            <GridCard image={movie.poster_path && `${IMAGE_URL}w500${movie.poster_path}`}
                            movieId={movie.id}
                            />
                        </React.Fragment>
                        )
                    })}

                </Row>

                {/*LOAD MORE button */}
                <br />
                <div id="loadmore">
                    <button>Load more</button>
                </div>
            </div>

        </div>
    )
}

export default LandingPage
