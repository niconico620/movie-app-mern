import React from 'react'
import { Col } from 'antd'
import './GridCard.css'
function GridCard(props) {

    if (props.actor) {
        return (
            <div>
                <Col lg={6} md={8} sm={12} xs={24} id="movieposter">
                    <div style={{ position: 'relative' }}>
                       
                            <img alt="img" src={props.image} />
                        <p style={{color: 'white', textAlign: 'center'}}>{props.name}</p>
                    </div>
                </Col>
            </div>
        )
    } else {

        return (
            <div>
                {/*The total size of a column is 24, so to fit in 4 cards in one column, we do this*/}
                <Col lg={6} md={8} sm={12} xs={24} id="movieposter">
                    <div style={{ position: 'relative' }}>
                        <a href={`/movie/${props.movieId}`}>
                            <img alt="img" src={props.image} />
                        </a>
                    </div>
                </Col>
            </div>
        )
    }
}

export default GridCard
