import React from 'react'
import { Icon, Col, Card, Row, Carousel } from 'antd';

function ImageSlider(props) {
    // console.log("imageslider",props)
    return (
        <div>
            <Carousel autoplay >
                {props.multiimages.map((image, index) => (
                    <div key={index}>
                        <img style={{ width: '100%', maxHeight: '150px' }}
                            src={`http://localhost:5000/${image}`} />
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default ImageSlider