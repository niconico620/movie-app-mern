import React from 'react'
import { Col } from 'antd'

function GridCard(props) {
    return (
        <div>
            {/*The total size of a column is 24, so to fit in 4 cards in one column, we do this*/}
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                    <a href={`/movie/${props.movieId}`}>
                        <img style={{width: '100%', height: '100%'}} alt src={props.image} />
                    </a>
                </div>
            </Col>
        </div>
    )
}

export default GridCard
