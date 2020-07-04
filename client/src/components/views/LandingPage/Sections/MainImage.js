import React from 'react'
import { Typography, Row } from 'antd';
const { Title } = Typography;

function MainImage(props) {
    return (

        <div style={{
            backgroundImage: `url('${props.image}')`,
            height: '500px',
            backgroundSize: ' cover',
            backgroundPosition: ' center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            position: 'relative'
        }}>

            {/*background: 'linear-gradient(to bottom right, rgba(0,0,0,0) 
                40%, rgba(0,0,0,0) 
                43%, rgba(0,0,0,0.60) 
                100%), url('${props.image}, #1c1c1c' */}


            <div>
                <div id="bannertitle">
                    {/*<Title> is taken from antd {Typography} */}
                    <Title style={{ color: 'white', fontFamily: "Roboto, Helvetica, Arial" }} level={2}>{props.title}</Title>
                    <p style={{ color: 'white', fontSize: '1.05rem', fontFamily: "Roboto, Helvetica, Arial" }}>{props.description}</p>
                </div>

            </div>
        </div>
    )
}

export default MainImage;