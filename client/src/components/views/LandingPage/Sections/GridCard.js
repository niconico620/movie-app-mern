import React from 'react'
import { Col } from 'antd'
import './GridCard.css'
function GridCard(props) {
    return (
        <div>
            {/*The total size of a column is 24, so to fit in 4 cards in one column, we do this*/}
            <Col lg={6} md={8} xs={24} id="movieposter">
                <div>
                    <a href={`/movie/${props.movieId}`}>
                        <img alt="img" src={props.image} />
                    </a>
                </div>
            </Col>
        </div>
    )
}

export default GridCard
