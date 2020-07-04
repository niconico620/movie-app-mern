import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_URL } from '../../Config';
import axios from 'axios';
import './LandingPage.css';
import { Typography, Row, Button } from 'antd';
import MainImage from './Sections/MainImage';
import GridCard from './Sections/GridCard';

const { Title } = Typography;

function LandingPage() {

    const [Movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {

        const pathway = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

        getMovies(pathway);

    }, [])

    const getMovies = (path) => {
        axios.get(path)
            .then(response => response.data)
            .then(response => {
                console.log(response);
                //response.results because it is what is shown in the console log  
                setMovies([...Movies, ...response.results]);
                setCurrentPage(response.page);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const loadClick = () => {
        const pathway = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`
        getMovies(pathway);
    }

    return (
        <div id="landingcontainer">

            {/*HEADER*/}
            {Movies[18] &&
                <MainImage image={`${IMAGE_URL}w1280${Movies[18].backdrop_path && Movies[18].backdrop_path}`} title={Movies[18].original_title} description={Movies[18].overview} />
            }
            {/*Needed to do the above so that we can get the value of movies[value] first. Not doing so will show an undefined error because the speed
            of getting the value is much slower than the rendering of the JSX elements, thus, we do this so that it can get the value. */}



            {/*BODY*/}
            <div id="moviesbody">
                <Title style={{ color: "rgb(245, 197, 24)", fontFamily: "Roboto, Helvetica, Arial" }} level={2}>Movies by latest</Title>
                <hr />

                {/*Grid Cards. Using antd again.*/}
                <Row gutter={[16, 16]}>
                    {Movies && Movies.map((movie, index) => {
                        return (
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
                    <Button type="primary" onClick={loadClick}>Load more</Button>
                </div>
            </div>

        </div>
    )
}

export default LandingPage
