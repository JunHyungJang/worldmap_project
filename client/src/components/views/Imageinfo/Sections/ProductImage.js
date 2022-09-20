import React, { useState, useEffect } from 'react'
import ImageGallery from 'react-image-gallery';

function ProductImage(props) {

    const [Images, setImages] = useState([])
    // console.log(props)
    useEffect(() => {
            
            if (props.detail.images) {
            let props_images = JSON.parse(props.detail.images)
            let images = []
            // console.log("props_imaegs",props_images)
            props_images.map(item => {
                console.log(item)
                images.push({
                    original: `http://localhost:5000/${item}`,
                    thumbnail: `http://localhost:5000/${item}`
                })
            })
            setImages(images)
        }
        

    }, [props.detail])

    return (
        <div>
            <ImageGallery items={Images} />
        </div>
    )
}

export default ProductImage